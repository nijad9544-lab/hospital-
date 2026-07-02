import { NextRequest, NextResponse } from "next/server";
import { prisma, SAFE_DOCTOR_SELECT } from "@/lib/db";
import { getCurrentDoctor } from "@/lib/auth";
import { doctorProfileSchema } from "@/lib/validation";

export async function GET() {
  const doctor = await getCurrentDoctor();
  if (!doctor) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(doctor);
}

export async function PATCH(req: NextRequest) {
  const doctor = await getCurrentDoctor();
  if (!doctor) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = doctorProfileSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const updated = await prisma.doctor.update({
    where: { id: doctor.id },
    data: parsed.data,
    select: SAFE_DOCTOR_SELECT,
  });

  return NextResponse.json({ success: true, doctor: updated });
}
