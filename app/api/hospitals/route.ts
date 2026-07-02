import { NextRequest, NextResponse } from "next/server";
import { prisma, SAFE_HOSPITAL_SELECT } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");
  const featured = searchParams.get("featured");

  const hospitals = await prisma.hospital.findMany({
    where: {
      status: "approved",
      ...(city ? { city } : {}),
      ...(featured === "true" ? { featured: true } : {}),
    },
    orderBy: { rating: "desc" },
    select: SAFE_HOSPITAL_SELECT,
  });

  return NextResponse.json(hospitals);
}
