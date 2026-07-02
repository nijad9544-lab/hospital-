import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { reviewSubmitSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = reviewSubmitSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const review = await prisma.review.create({
    data: { ...parsed.data, status: "pending" },
  });

  return NextResponse.json({ success: true, id: review.id });
}
