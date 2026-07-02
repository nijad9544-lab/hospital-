import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentHospital } from "@/lib/auth";
import { z } from "zod";

const hospitalQuoteSchema = z.object({
  quoteRequestId: z.string().min(1),
  price: z.coerce.number().int().positive("Enter a valid price"),
  currency: z.string().min(1).default("INR"),
  notes: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const hospital = await getCurrentHospital();
  if (!hospital) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = hospitalQuoteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { quoteRequestId, price, currency, notes } = parsed.data;

  const quoteRequest = await prisma.quoteRequest.findUnique({ where: { id: quoteRequestId } });
  if (!quoteRequest) {
    return NextResponse.json({ error: "Quote request not found" }, { status: 404 });
  }

  const quote = await prisma.hospitalQuote.create({
    data: {
      quoteRequestId,
      hospitalId: hospital.id,
      price,
      currency,
      notes,
    },
  });

  await prisma.quoteRequest.update({
    where: { id: quoteRequestId },
    data: { status: "quoted" },
  });

  return NextResponse.json({ success: true, id: quote.id });
}
