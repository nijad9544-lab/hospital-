import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { prisma } from "@/lib/db";
import { buildMetadata, faqPageJsonLd, SITE_URL } from "@/lib/seo";
import { asStringArray, asItinerary } from "@/lib/types";
import { getPackageFaqs } from "@/lib/faq";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ItineraryAccordion } from "@/components/sections/ItineraryAccordion";
import { PackageCard } from "@/components/sections/PackageCard";
import { BookingForm } from "@/components/forms/BookingForm";
import { Price } from "@/components/ui/Price";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { JsonLd } from "@/components/seo/PageSEO";

export async function generateStaticParams() {
  try {
    const packages = await prisma.package.findMany({ select: { slug: true } });
    return packages.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

async function getPackage(slug: string) {
  return prisma.package.findUnique({
    where: { slug },
    include: { hospital: true },
  });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const pkg = await getPackage(params.slug);
  if (!pkg) return {};

  return buildMetadata({
    title: pkg.metaTitle || pkg.name,
    description: pkg.metaDesc || pkg.description.slice(0, 155),
    keywords: [pkg.name, pkg.category, "Kerala package"],
    path: `/packages/${pkg.slug}`,
    imageUrl: pkg.imageUrl || undefined,
  });
}

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || "+91XXXXXXXXXX";

export default async function PackageDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const pkg = await getPackage(params.slug);
  if (!pkg) notFound();

  const inclusions = asStringArray(pkg.inclusions);
  const itinerary = asItinerary(pkg.itinerary);

  const similarPackages = await prisma.package.findMany({
    where: { category: pkg.category, slug: { not: pkg.slug } },
    take: 3,
  });

  const waText = encodeURIComponent(`I am interested in the ${pkg.name} package`);
  const faqs = getPackageFaqs({ name: pkg.name, duration: pkg.duration, city: pkg.city });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: pkg.name,
          description: pkg.description,
          url: `${SITE_URL}/packages/${pkg.slug}`,
          offers: {
            "@type": "Offer",
            price: pkg.price,
            priceCurrency: pkg.currency,
            availability: "https://schema.org/InStock",
          },
        }}
      />
      <JsonLd data={faqPageJsonLd(faqs)} />

      <Breadcrumbs
        items={[
          { name: "Packages", path: "/packages" },
          { name: pkg.name, path: `/packages/${pkg.slug}` },
        ]}
      />

      <div className="mt-4 flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          <div className="relative h-64 w-full overflow-hidden rounded-card bg-primary/10">
            {pkg.imageUrl && (
              <Image
                src={pkg.imageUrl}
                alt={`${pkg.name} in ${pkg.city}, Kerala`}
                fill
                priority
                className="object-cover"
              />
            )}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Badge variant="secondary" className="capitalize">{pkg.category}</Badge>
            <span className="text-sm text-muted">{pkg.duration} &middot; {pkg.city}</span>
          </div>
          <h1 className="mt-3 text-3xl font-semibold text-darktext">{pkg.name}</h1>
          <Price amountInINR={pkg.price} className="mt-3 block text-2xl font-semibold text-primary" />
          <p className="mt-4 text-muted">{pkg.description}</p>

          <h2 className="mt-8 text-xl font-semibold text-darktext">Day-by-Day Itinerary</h2>
          <div className="mt-4">
            <ItineraryAccordion itinerary={itinerary} />
          </div>

          <h2 className="mt-8 text-xl font-semibold text-darktext">Inclusions</h2>
          <ul className="mt-4 space-y-2">
            {inclusions.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-darktext">
                <Check size={16} className="text-primary" /> {item}
              </li>
            ))}
            <li className="flex items-center gap-2 text-sm text-muted">
              <X size={16} className="text-red-400" /> International flights
            </li>
            <li className="flex items-center gap-2 text-sm text-muted">
              <X size={16} className="text-red-400" /> Visa fees
            </li>
          </ul>

          {pkg.hospital && (
            <>
              <h2 className="mt-8 text-xl font-semibold text-darktext">Hospital</h2>
              <div className="mt-4 rounded-card bg-white p-5 shadow-soft">
                <p className="font-medium text-darktext">{pkg.hospital.name}</p>
                <p className="text-sm text-muted">{pkg.hospital.city}, Kerala</p>
              </div>
            </>
          )}

          <h2 className="mt-8 text-xl font-semibold text-darktext">Price Breakdown</h2>
          <table className="mt-4 w-full overflow-hidden rounded-card bg-white text-sm shadow-soft">
            <tbody>
              <tr className="border-b border-offwhite">
                <td className="px-5 py-3 text-muted">Treatment / Therapy Cost</td>
                <td className="px-5 py-3 text-right font-medium text-darktext">
                  <Price amountInINR={Math.round(pkg.price * 0.7)} />
                </td>
              </tr>
              <tr className="border-b border-offwhite">
                <td className="px-5 py-3 text-muted">Accommodation & Logistics</td>
                <td className="px-5 py-3 text-right font-medium text-darktext">
                  <Price amountInINR={Math.round(pkg.price * 0.2)} />
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 text-muted">Coordination & Support</td>
                <td className="px-5 py-3 text-right font-medium text-darktext">
                  <Price amountInINR={Math.round(pkg.price * 0.1)} />
                </td>
              </tr>
            </tbody>
          </table>

          <h2 className="mt-10 text-xl font-semibold text-darktext">
            Frequently Asked Questions
          </h2>
          <div className="mt-4">
            <FaqAccordion faqs={faqs} />
          </div>

          {similarPackages.length > 0 && (
            <>
              <h2 className="mt-10 text-xl font-semibold text-darktext">Similar Packages</h2>
              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {similarPackages.map((p) => (
                  <PackageCard key={p.id} pkg={p} />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="w-full lg:sticky lg:top-24 lg:h-fit lg:w-80 space-y-3">
          <BookingForm packageId={pkg.id} hospitalId={pkg.hospitalId || undefined} defaultTreatment={pkg.name} />
          <a
            href={`https://wa.me/${WA_NUMBER.replace(/[^0-9]/g, "")}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-pill bg-primary px-5 py-3 text-center text-sm font-medium text-white hover:bg-primary-dark"
          >
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
