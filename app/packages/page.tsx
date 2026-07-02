import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { prisma } from "@/lib/db";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PackagesExplorer } from "@/components/sections/PackagesExplorer";

export const metadata: Metadata = buildMetadata({
  title: "Medical & Ayurveda Packages in Kerala",
  description:
    "Browse all-inclusive medical, Ayurveda, combo and wellness stay packages in Kerala with transparent pricing and itineraries.",
  keywords: ["Kerala medical packages", "Ayurveda packages", "Kerala wellness packages"],
  path: "/packages",
});

export default async function PackagesPage() {
  const packages = await prisma.package.findMany({
    orderBy: [{ featured: "desc" }, { popular: "desc" }],
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "Packages", path: "/packages" }]} />
      <h1 className="mt-4 text-3xl font-semibold text-darktext">
        Medical & Ayurveda Packages in Kerala
      </h1>
      <p className="mt-2 max-w-2xl text-muted">
        All-inclusive packages covering treatment, hospital stay, Ayurveda therapies
        and travel logistics.
      </p>

      <div className="mt-8">
        <PackagesExplorer packages={packages} />
      </div>
    </div>
  );
}
