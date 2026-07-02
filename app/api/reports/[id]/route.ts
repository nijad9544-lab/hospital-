import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentPatient, isAdminAuthenticated } from "@/lib/auth";
import { readReportFile } from "@/lib/storage";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const report = await prisma.medicalReport.findUnique({
    where: { id: params.id },
    include: { quoteRequest: true },
  });

  if (!report) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const patient = await getCurrentPatient();
  const isOwner = patient && report.quoteRequest.patientId === patient.id;
  const isAdmin = await isAdminAuthenticated();

  if (!isOwner && !isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const buffer = await readReportFile(report.storedPath);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": report.mimeType,
      "Content-Disposition": `inline; filename="${report.fileName}"`,
    },
  });
}
