import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const city = searchParams.get("city");
  const featured = searchParams.get("featured");

  const packages = await prisma.package.findMany({
    where: {
      ...(category ? { category } : {}),
      ...(city ? { city } : {}),
      ...(featured === "true" ? { featured: true } : {}),
      OR: [{ hospitalId: null }, { hospital: { status: "approved" } }],
    },
    include: { hospital: true },
    orderBy: { featured: "desc" },
  });

  return NextResponse.json(packages);
}
