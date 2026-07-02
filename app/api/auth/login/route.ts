import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { loginSchema } from "@/lib/validation";
import { verifyPassword, createPatientSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { email, password } = parsed.data;

  const patient = await prisma.patient.findUnique({ where: { email } });
  if (!patient) {
    return NextResponse.json(
      { error: { formErrors: ["Invalid email or password."] } },
      { status: 401 }
    );
  }

  const valid = await verifyPassword(password, patient.passwordHash);
  if (!valid) {
    return NextResponse.json(
      { error: { formErrors: ["Invalid email or password."] } },
      { status: 401 }
    );
  }

  await createPatientSession(patient.id);

  return NextResponse.json({ success: true });
}
