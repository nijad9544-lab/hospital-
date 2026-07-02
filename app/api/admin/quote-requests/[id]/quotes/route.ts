import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";
import { adminQuoteSchema } from "@/lib/validation";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = adminQuoteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const quoteRequest = await prisma.quoteRequest.findUnique({ where: { id: params.id } });
  if (!quoteRequest) {
    return NextResponse.json({ error: "Quote request not found" }, { status: 404 });
  }

  const quote = await prisma.hospitalQuote.create({
    data: {
      quoteRequestId: params.id,
      hospitalId: parsed.data.hospitalId,
      price: parsed.data.price,
      currency: parsed.data.currency,
      notes: parsed.data.notes,
    },
  });

  await prisma.quoteRequest.update({
    where: { id: params.id },
    data: { status: "quoted" },
  });

  return NextResponse.json({ success: true, id: quote.id });
}
