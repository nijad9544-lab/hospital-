import { NextRequest, NextResponse } from "next/server";
import { prisma, SAFE_HOSPITAL_SELECT } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";
import { adminHospitalCreateSchema } from "@/lib/validation";
import { slugify } from "@/lib/types";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const hospitals = await prisma.hospital.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    select: SAFE_HOSPITAL_SELECT,
  });

  return NextResponse.json(hospitals);
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = adminHospitalCreateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;

  const existing = await prisma.hospital.findUnique({ where: { email: data.email } });
  if (existing) {
    return NextResponse.json(
      { error: { formErrors: ["A hospital with this email already exists"] } },
      { status: 409 }
    );
  }

  const toList = (value?: string) =>
    value ? value.split(",").map((v) => v.trim()).filter(Boolean) : [];

  const hospital = await prisma.hospital.create({
    data: {
      slug: slugify(data.name),
      name: data.name,
      email: data.email,
      city: data.city,
      phone: data.phone,
      address: data.address,
      description: data.description,
      website: data.website || undefined,
      accreditation: JSON.stringify(toList(data.accreditation)),
      specialities: JSON.stringify(toList(data.specialities)),
      imageUrl: data.imageUrl || undefined,
      featured: data.featured ?? false,
      status: "approved",
    },
    select: SAFE_HOSPITAL_SELECT,
  });

  return NextResponse.json({ success: true, id: hospital.id, slug: hospital.slug });
}
