import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { registerSchema } from "@/lib/validation";
import { hashPassword, createPatientSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { name, email, password, phone, country } = parsed.data;

  const existing = await prisma.patient.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: { formErrors: ["An account with this email already exists."] } },
      { status: 409 }
    );
  }

  const passwordHash = await hashPassword(password);

  const patient = await prisma.patient.create({
    data: { name, email, passwordHash, phone, country },
  });

  await createPatientSession(patient.id);

  return NextResponse.json({ success: true, id: patient.id });
}
