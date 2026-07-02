import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hospitalSignupSchema } from "@/lib/validation";
import { hashPassword, createHospitalSession } from "@/lib/auth";
import { slugify } from "@/lib/types";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = hospitalSignupSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;

  const existing = await prisma.hospital.findUnique({ where: { email: data.email } });
  if (existing) {
    return NextResponse.json(
      { error: { formErrors: ["An account with this email already exists"] } },
      { status: 409 }
    );
  }

  const passwordHash = await hashPassword(data.password);

  const hospital = await prisma.hospital.create({
    data: {
      slug: slugify(data.name),
      name: data.name,
      email: data.email,
      passwordHash,
      city: data.city,
      phone: data.phone,
      address: data.address,
      description: data.description,
      accreditation: JSON.stringify([]),
      specialities: JSON.stringify([]),
      status: "pending",
    },
  });

  await createHospitalSession(hospital.id);

  return NextResponse.json({ success: true, id: hospital.id });
}
