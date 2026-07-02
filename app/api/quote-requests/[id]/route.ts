import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentPatient } from "@/lib/auth";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const patient = await getCurrentPatient();
  if (!patient) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const quoteRequest = await prisma.quoteRequest.findUnique({
    where: { id: params.id },
    include: { quotes: { include: { hospital: true } }, reports: true },
  });

  if (!quoteRequest || quoteRequest.patientId !== patient.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(quoteRequest);
}
