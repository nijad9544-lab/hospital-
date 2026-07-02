import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [hospitals, doctors, packages, treatments, posts] = await Promise.all([
    prisma.hospital.findMany({ where: { status: "approved" }, select: { slug: true } }),
    prisma.doctor.findMany({ where: { status: "approved" }, select: { slug: true } }),
    prisma.package.findMany({ select: { slug: true } }),
    prisma.treatment.findMany({ select: { slug: true } }),
    prisma.blogPost.findMany({ select: { slug: true } }),
  ]);

  const staticRoutes = [
    "",
    "/hospitals",
    "/doctors",
    "/packages",
    "/treatments",
    "/ayurveda",
    "/visa-help",
    "/contact",
    "/blog",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const dynamicRoutes = [
    ...hospitals.map((h) => ({ url: `${SITE_URL}/hospitals/${h.slug}`, lastModified: new Date() })),
    ...doctors.map((d) => ({ url: `${SITE_URL}/doctors/${d.slug}`, lastModified: new Date() })),
    ...packages.map((p) => ({ url: `${SITE_URL}/packages/${p.slug}`, lastModified: new Date() })),
    ...treatments.map((t) => ({ url: `${SITE_URL}/treatments/${t.slug}`, lastModified: new Date() })),
    ...posts.map((b) => ({ url: `${SITE_URL}/blog/${b.slug}`, lastModified: new Date() })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
