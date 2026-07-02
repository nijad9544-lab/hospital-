import { NextResponse } from "next/server";
import { prisma, SAFE_DOCTOR_SELECT } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const doctors = await prisma.doctor.findMany({
    select: { ...SAFE_DOCTOR_SELECT, hospital: { select: { name: true, city: true } } },
    orderBy: [{ status: "asc" }],
  });

  return NextResponse.json(doctors);
}
