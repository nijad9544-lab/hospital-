import { NextRequest, NextResponse } from "next/server";
import { prisma, SAFE_HOSPITAL_SELECT } from "@/lib/db";
import { getCurrentHospital } from "@/lib/auth";
import { hospitalProfileSchema } from "@/lib/validation";

export async function GET() {
  const hospital = await getCurrentHospital();
  if (!hospital) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(hospital);
}

export async function PATCH(req: NextRequest) {
  const hospital = await getCurrentHospital();
  if (!hospital) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = hospitalProfileSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const updated = await prisma.hospital.update({
    where: { id: hospital.id },
    data: parsed.data,
    select: SAFE_HOSPITAL_SELECT,
  });

  return NextResponse.json({ success: true, hospital: updated });
}
