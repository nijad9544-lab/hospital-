import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { partnerLoginSchema } from "@/lib/validation";
import { verifyPassword, createDoctorSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = partnerLoginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { email, password } = parsed.data;

  const credentials = await prisma.doctor.findUnique({
    where: { email },
    select: { id: true, passwordHash: true },
  });
  if (!credentials || !credentials.passwordHash) {
    return NextResponse.json(
      { error: { formErrors: ["Invalid email or password"] } },
      { status: 401 }
    );
  }

  const valid = await verifyPassword(password, credentials.passwordHash);
  if (!valid) {
    return NextResponse.json(
      { error: { formErrors: ["Invalid email or password"] } },
      { status: 401 }
    );
  }

  await createDoctorSession(credentials.id);

  return NextResponse.json({ success: true });
}
