import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentHospital } from "@/lib/auth";

export async function GET() {
  const hospital = await getCurrentHospital();
  if (!hospital) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const requests = await prisma.quoteRequest.findMany({
    where: { status: { not: "closed" } },
    include: {
      patient: { select: { id: true, name: true, country: true } },
      reports: true,
      quotes: { include: { hospital: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(requests);
}
