import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentPatient } from "@/lib/auth";
import { analyzeMedicalCase, recommendHospitals } from "@/lib/ai";

export async function POST(req: NextRequest) {
  const patient = await getCurrentPatient();
  if (!patient) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { quoteRequestId } = await req.json();
  if (!quoteRequestId) {
    return NextResponse.json({ error: "quoteRequestId is required" }, { status: 400 });
  }

  const quoteRequest = await prisma.quoteRequest.findUnique({
    where: { id: quoteRequestId },
    include: { reports: true },
  });

  if (!quoteRequest || quoteRequest.patientId !== patient.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const analysis = await analyzeMedicalCase({
    treatment: quoteRequest.treatment,
    message: quoteRequest.message,
    reportFileNames: quoteRequest.reports.map((r) => r.fileName),
  });

  const recommendedHospitals = await recommendHospitals(analysis.recommendedTreatmentCategory);

  return NextResponse.json({ analysis, recommendedHospitals });
}
