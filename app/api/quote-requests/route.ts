import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { quoteRequestSchema } from "@/lib/validation";
import { getCurrentPatient } from "@/lib/auth";
import { saveReportFile, ALLOWED_MIME_TYPES, MAX_FILE_SIZE } from "@/lib/storage";

export async function GET() {
  const patient = await getCurrentPatient();
  if (!patient) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const requests = await prisma.quoteRequest.findMany({
    where: { patientId: patient.id },
    include: { quotes: { include: { hospital: true } }, reports: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(requests);
}

export async function POST(req: NextRequest) {
  const patient = await getCurrentPatient();
  if (!patient) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const treatment = formData.get("treatment");
  const message = formData.get("message");

  const parsed = quoteRequestSchema.safeParse({
    treatment: typeof treatment === "string" ? treatment : "",
    message: typeof message === "string" ? message : undefined,
  });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const files = formData.getAll("reports").filter((f): f is File => f instanceof File);

  for (const file of files) {
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: { formErrors: [`Unsupported file type: ${file.type || file.name}`] } },
        { status: 400 }
      );
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: { formErrors: [`${file.name} exceeds the 10MB size limit`] } },
        { status: 400 }
      );
    }
  }

  const quoteRequest = await prisma.quoteRequest.create({
    data: {
      patientId: patient.id,
      treatment: parsed.data.treatment,
      message: parsed.data.message,
    },
  });

  for (const file of files) {
    const storedPath = await saveReportFile(quoteRequest.id, file);
    await prisma.medicalReport.create({
      data: {
        quoteRequestId: quoteRequest.id,
        fileName: file.name,
        storedPath,
        mimeType: file.type,
        size: file.size,
      },
    });
  }

  return NextResponse.json({ success: true, id: quoteRequest.id });
}
