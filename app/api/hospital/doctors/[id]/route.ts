import { NextRequest, NextResponse } from "next/server";
import { prisma, SAFE_DOCTOR_SELECT } from "@/lib/db";
import { getCurrentHospital } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const hospital = await getCurrentHospital();
  if (!hospital) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const doctor = await prisma.doctor.findUnique({ where: { id: params.id } });
  if (!doctor || doctor.hospitalId !== hospital.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();
  const updated = await prisma.doctor.update({
    where: { id: params.id },
    data: {
      speciality: body.speciality ?? doctor.speciality,
      qualification: body.qualification ?? doctor.qualification,
      experience: typeof body.experience === "number" ? body.experience : doctor.experience,
      bio: body.bio ?? doctor.bio,
    },
    select: SAFE_DOCTOR_SELECT,
  });

  return NextResponse.json({ success: true, doctor: updated });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const hospital = await getCurrentHospital();
  if (!hospital) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const doctor = await prisma.doctor.findUnique({ where: { id: params.id } });
  if (!doctor || doctor.hospitalId !== hospital.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.availability.deleteMany({ where: { doctorId: params.id } });
  await prisma.doctor.delete({ where: { id: params.id } });

  return NextResponse.json({ success: true });
}
