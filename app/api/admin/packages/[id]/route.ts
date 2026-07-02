import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";
import { adminPackageCreateSchema } from "@/lib/validation";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pkg = await prisma.package.findUnique({ where: { id: params.id } });
  if (!pkg) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(pkg);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
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

  const pkg = await prisma.package.update({
    where: { id: params.id },
    data: {
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
      hospitalId: data.hospitalId || null,
      featured: data.featured ?? false,
      popular: data.popular ?? false,
      imageUrl: data.imageUrl || null,
    },
  });

  return NextResponse.json({ success: true, package: pkg });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pkg = await prisma.package.findUnique({ where: { id: params.id } });
  if (!pkg) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.package.delete({ where: { id: params.id } });

  return NextResponse.json({ success: true });
}
