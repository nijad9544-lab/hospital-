import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { enquirySchema } from "@/lib/validation";
import { sendEnquiryEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = enquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;

  const enquiry = await prisma.enquiry.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      country: data.country,
      treatment: data.treatment,
      message: data.message,
      packageId: data.packageId,
      hospitalId: data.hospitalId,
    },
  });

  await sendEnquiryEmail(data);

  return NextResponse.json({ success: true, id: enquiry.id });
}
