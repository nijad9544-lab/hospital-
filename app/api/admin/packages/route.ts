import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";
import { adminPackageCreateSchema } from "@/lib/validation";
import { slugify } from "@/lib/types";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const packages = await prisma.package.findMany({
    include: { hospital: { select: { name: true, city: true } } },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(packages);
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = adminPackageCreateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;

  const toList = (value?: string) =>
    value ? value.split(",").map((v) => v.trim()).filter(Boolean) : [];

  const pkg = await prisma.package.create({
    data: {
      slug: slugify(data.name),
      name: data.name,
      category: data.category,
      description: data.description,
      duration: data.duration,
      city: data.city,
      price: data.price,
      currency: data.currency,
      inclusions: JSON.stringify(toList(data.inclusions)),
      itinerary: JSON.stringify(data.itinerary),
      tags: JSON.stringify(toList(data.tags)),
      hospitalId: data.hospitalId || undefined,
      featured: data.featured ?? false,
      popular: data.popular ?? false,
      imageUrl: data.imageUrl || undefined,
    },
  });

  return NextResponse.json({ success: true, id: pkg.id, slug: pkg.slug });
}
