import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { buildMetadata, faqPageJsonLd, SITE_URL } from "@/lib/seo";
import { asStringArray, asFaqs } from "@/lib/types";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Price } from "@/components/ui/Price";
import { JsonLd } from "@/components/seo/PageSEO";

export async function generateStaticParams() {
  try {
    const treatments = await prisma.treatment.findMany({ select: { slug: true } });
    return treatments.map((t) => ({ slug: t.slug }));
  } catch {
    return [];
  }
}

async function getTreatment(slug: string) {
  return prisma.treatment.findUnique({ where: { slug } });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const treatment = await getTreatment(params.slug);
  if (!treatment) return {};

  return buildMetadata({
    title: treatment.metaTitle || `${treatment.name} in Kerala`,
    description: treatment.metaDesc || treatment.description.slice(0, 155),
    keywords: [treatment.name, treatment.category, "Kerala treatment cost"],
    path: `/treatments/${treatment.slug}`,
  });
}

function formatUsdEquivalent(inr: number) {
  return Math.round(inr / 83);
}

export default async function TreatmentDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const treatment = await getTreatment(params.slug);
  if (!treatment) notFound();

  const hospitalNames = asStringArray(treatment.hospitals);
  const faqs = asFaqs(treatment.faqs);
  const keralaUsd = formatUsdEquivalent(treatment.costIndia);

  const topHospitals = await prisma.hospital.findMany({
    where: { name: { in: hospitalNames }, status: "approved" },
    take: 5,
  });

  const contentParagraphs = treatment.content.split("\n\n");

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalProcedure",
          name: treatment.name,
          description: treatment.description,
          url: `${SITE_URL}/treatments/${treatment.slug}`,
        }}
      />

      <Breadcrumbs
        items={[
          { name: "Treatments", path: "/treatments" },
          { name: treatment.name, path: `/treatments/${treatment.slug}` },
        ]}
      />

      <Badge variant="primary" className="mt-4">{treatment.category}</Badge>
      <h1 className="mt-3 text-3xl font-semibold text-darktext">
        {treatment.name} in Kerala
      </h1>
      <p className="mt-3 text-muted">{treatment.description}</p>

      <div className="mt-8 space-y-4 text-darktext">
        {contentParagraphs.map((p, i) => (
          <p key={i} className="leading-relaxed">{p.replace(/^##\s*/, "")}</p>
        ))}
      </div>

      <h2 className="mt-10 text-xl font-semibold text-darktext">Cost Comparison</h2>
      <div className="mt-4 overflow-x-auto rounded-card bg-white shadow-soft">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="bg-primary/5">
            <tr>
              <th className="px-5 py-3 font-semibold text-darktext">Country</th>
              <th className="px-5 py-3 font-semibold text-darktext">Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-offwhite">
              <td className="px-5 py-3 font-medium text-darktext">Kerala, India</td>
              <td className="px-5 py-3 text-primary font-semibold">
                <Price amountInINR={treatment.costIndia} /> (~${keralaUsd.toLocaleString()})
              </td>
            </tr>
            {treatment.costUSA && (
              <tr className="border-t border-offwhite">
                <td className="px-5 py-3 text-muted">USA</td>
                <td className="px-5 py-3 text-muted">${treatment.costUSA.toLocaleString()}</td>
              </tr>
            )}
            {treatment.costUK && (
              <tr className="border-t border-offwhite">
                <td className="px-5 py-3 text-muted">UK</td>
                <td className="px-5 py-3 text-muted">£{treatment.costUK.toLocaleString()}</td>
              </tr>
            )}
            <tr className="border-t border-offwhite">
              <td className="px-5 py-3 text-muted">Thailand (est.)</td>
              <td className="px-5 py-3 text-muted">
                ${Math.round(keralaUsd * 1.6).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {topHospitals.length > 0 && (
        <>
          <h2 className="mt-10 text-xl font-semibold text-darktext">
            Top Hospitals for {treatment.name}
          </h2>
          <ul className="mt-4 space-y-2">
            {topHospitals.map((h) => (
              <li key={h.id} className="rounded-card bg-white p-4 shadow-soft">
                <a href={`/hospitals/${h.slug}`} className="font-medium text-darktext hover:text-primary">
                  {h.name}
                </a>
                <p className="text-sm text-muted">{h.city}, Kerala</p>
              </li>
            ))}
          </ul>
        </>
      )}

      <h2 className="mt-10 text-xl font-semibold text-darktext">Recovery Timeline</h2>
      <p className="mt-3 text-muted">
        Expected duration of stay: <span className="font-medium text-darktext">{treatment.duration}</span>.
        Most patients are cleared to travel home after a final physician review confirms
        satisfactory healing and stability.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-darktext">Frequently Asked Questions</h2>
      <div className="mt-4">
        <FaqAccordion faqs={faqs} />
      </div>
      {faqs.length > 0 && <JsonLd data={faqPageJsonLd(faqs)} />}

      <div className="mt-10 max-w-md">
        <QuoteForm />
      </div>
    </div>
  );
}
