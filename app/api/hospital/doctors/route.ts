import { NextRequest, NextResponse } from "next/server";
import { prisma, SAFE_DOCTOR_SELECT } from "@/lib/db";
import { getCurrentHospital, hashPassword } from "@/lib/auth";
import { doctorCreateSchema } from "@/lib/validation";
import { slugify } from "@/lib/types";

export async function GET() {
  const hospital = await getCurrentHospital();
  if (!hospital) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const doctors = await prisma.doctor.findMany({
    where: { hospitalId: hospital.id },
    select: { ...SAFE_DOCTOR_SELECT, availability: true },
  });

  return NextResponse.json(doctors);
}

export async function POST(req: NextRequest) {
  const hospital = await getCurrentHospital();
  if (!hospital) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = doctorCreateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;

  const existing = await prisma.doctor.findUnique({ where: { email: data.email } });
  if (existing) {
    return NextResponse.json(
      { error: { formErrors: ["A doctor with this email already exists"] } },
      { status: 409 }
    );
  }

  const passwordHash = await hashPassword(data.password);

  const doctor = await prisma.doctor.create({
    data: {
      slug: slugify(`${data.title}-${data.name}`),
      name: data.name,
      title: data.title,
      speciality: data.speciality,
      qualification: data.qualification,
      experience: data.experience,
      bio: data.bio,
      email: data.email,
      passwordHash,
      hospitalId: hospital.id,
      languages: JSON.stringify(["English"]),
      status: "pending",
    },
  });

  return NextResponse.json({ success: true, id: doctor.id });
}
