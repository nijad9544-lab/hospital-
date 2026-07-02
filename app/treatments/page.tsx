import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo";
import { prisma } from "@/lib/db";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Price } from "@/components/ui/Price";

export const metadata: Metadata = buildMetadata({
  title: "Treatments Available in Kerala",
  description:
    "Explore cardiac, orthopaedic, dental, fertility, Ayurveda and oncology treatments available in Kerala with cost comparisons.",
  keywords: ["Kerala treatments", "medical procedures Kerala", "treatment cost Kerala"],
  path: "/treatments",
});

async function TreatmentsList({ searchParams }: { searchParams: { q?: string; city?: string } }) {
  const treatments = await prisma.treatment.findMany({
    where: searchParams.q
      ? { name: { contains: searchParams.q } }
      : undefined,
  });

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {treatments.map((t) => (
        <Link key={t.id} href={`/treatments/${t.slug}`}>
          <Card className="h-full p-5 transition-transform hover:-translate-y-1">
            <Badge variant="primary">{t.category}</Badge>
            <h2 className="mt-3 text-lg font-semibold text-darktext">{t.name}</h2>
            <p className="mt-2 line-clamp-3 text-sm text-muted">{t.description}</p>
            <p className="mt-3 text-sm font-medium text-primary">
              From <Price amountInINR={t.costIndia} />
            </p>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default function TreatmentsPage({
  searchParams,
}: {
  searchParams: { q?: string; city?: string };
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "Treatments", path: "/treatments" }]} />
      <h1 className="mt-4 text-3xl font-semibold text-darktext">
        Treatments Available in Kerala
      </h1>
      <p className="mt-2 max-w-2xl text-muted">
        Compare costs and explore the most sought-after treatments performed at
        Kerala&apos;s leading hospitals.
      </p>

      <Suspense>
        <TreatmentsList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
