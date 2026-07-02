import { NextRequest, NextResponse } from "next/server";
import { prisma, SAFE_HOSPITAL_SELECT } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";
import { adminHospitalCreateSchema } from "@/lib/validation";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const hospital = await prisma.hospital.findUnique({
    where: { id: params.id },
    select: SAFE_HOSPITAL_SELECT,
  });

  if (!hospital) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(hospital);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = adminHospitalCreateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;

  const emailOwner = await prisma.hospital.findUnique({ where: { email: data.email } });
  if (emailOwner && emailOwner.id !== params.id) {
    return NextResponse.json(
      { error: { formErrors: ["Another hospital already uses this email"] } },
      { status: 409 }
    );
  }

  const toList = (value?: string) =>
    value ? value.split(",").map((v) => v.trim()).filter(Boolean) : [];

  const hospital = await prisma.hospital.update({
    where: { id: params.id },
    data: {
      name: data.name,
      email: data.email,
      city: data.city,
      phone: data.phone,
      address: data.address,
      description: data.description,
      website: data.website || null,
      accreditation: JSON.stringify(toList(data.accreditation)),
      specialities: JSON.stringify(toList(data.specialities)),
      imageUrl: data.imageUrl || null,
      featured: data.featured ?? false,
    },
    select: SAFE_HOSPITAL_SELECT,
  });

  return NextResponse.json({ success: true, hospital });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const hospital = await prisma.hospital.findUnique({ where: { id: params.id } });
  if (!hospital) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const quoteCount = await prisma.hospitalQuote.count({ where: { hospitalId: params.id } });
  if (quoteCount > 0) {
    return NextResponse.json(
      {
        error: {
          formErrors: [
            `Cannot delete: ${quoteCount} patient quote${quoteCount === 1 ? "" : "s"} reference this hospital.`,
          ],
        },
      },
      { status: 409 }
    );
  }

  await prisma.availability.deleteMany({ where: { doctor: { hospitalId: params.id } } });
  await prisma.doctor.deleteMany({ where: { hospitalId: params.id } });
  await prisma.package.updateMany({ where: { hospitalId: params.id }, data: { hospitalId: null } });
  await prisma.hospital.delete({ where: { id: params.id } });

  return NextResponse.json({ success: true });
}
