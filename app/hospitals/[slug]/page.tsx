import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma, SAFE_HOSPITAL_SELECT, SAFE_DOCTOR_SELECT } from "@/lib/db";
import { buildMetadata, faqPageJsonLd, SITE_URL } from "@/lib/seo";
import { asStringArray } from "@/lib/types";
import { getHospitalFaqs } from "@/lib/faq";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { HospitalTabs } from "@/components/sections/HospitalTabs";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { JsonLd } from "@/components/seo/PageSEO";

export async function generateStaticParams() {
  try {
    const hospitals = await prisma.hospital.findMany({
      where: { status: "approved" },
      select: { slug: true },
    });
    return hospitals.map((h) => ({ slug: h.slug }));
  } catch {
    return [];
  }
}

async function getHospital(slug: string) {
  return prisma.hospital.findFirst({
    where: { slug, status: "approved" },
    select: {
      ...SAFE_HOSPITAL_SELECT,
      doctors: { where: { status: "approved" }, select: SAFE_DOCTOR_SELECT },
      packages: true,
    },
  });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const hospital = await getHospital(params.slug);
  if (!hospital) return {};

  return buildMetadata({
    title: `${hospital.name} - ${hospital.city}, Kerala`,
    description: hospital.description.slice(0, 155),
    keywords: [hospital.name, `${hospital.city} hospital`, "Kerala medical tourism"],
    path: `/hospitals/${hospital.slug}`,
    imageUrl: hospital.imageUrl || undefined,
  });
}

export default async function HospitalDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const hospital = await getHospital(params.slug);
  if (!hospital) notFound();

  const accreditations = asStringArray(hospital.accreditation);
  const faqs = getHospitalFaqs({
    name: hospital.name,
    city: hospital.city,
    accreditation: accreditations,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalOrganization",
          name: hospital.name,
          url: `${SITE_URL}/hospitals/${hospital.slug}`,
          address: hospital.address,
          telephone: hospital.phone,
          email: hospital.email,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: hospital.rating,
            reviewCount: hospital.reviewCount,
          },
        }}
      />
      <JsonLd data={faqPageJsonLd(faqs)} />

      <Breadcrumbs
        items={[
          { name: "Hospitals", path: "/hospitals" },
          { name: hospital.name, path: `/hospitals/${hospital.slug}` },
        ]}
      />

      <div className="mt-4 flex flex-col gap-6 lg:flex-row">
        <div className="flex-1">
          <div className="relative h-64 w-full overflow-hidden rounded-card bg-primary/10">
            {hospital.imageUrl && (
              <Image
                src={hospital.imageUrl}
                alt={`${hospital.name} building in ${hospital.city}, Kerala`}
                fill
                priority
                className="object-cover"
              />
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {accreditations.map((a) => (
              <Badge key={a} variant="primary">{a}</Badge>
            ))}
          </div>
          <h1 className="mt-3 text-3xl font-semibold text-darktext">{hospital.name}</h1>
          <p className="mt-1 text-muted">{hospital.city}, Kerala</p>
          <div className="mt-2">
            <StarRating rating={hospital.rating} reviewCount={hospital.reviewCount} />
          </div>

          <div className="mt-6">
            <HospitalTabs
              description={hospital.description}
              specialities={hospital.specialities}
              address={hospital.address}
              doctors={hospital.doctors}
              packages={hospital.packages}
              rating={hospital.rating}
              reviewCount={hospital.reviewCount}
              phone={hospital.phone}
              email={hospital.email}
            />
          </div>

          <h2 className="mt-10 text-xl font-semibold text-darktext">
            Frequently Asked Questions
          </h2>
          <div className="mt-4">
            <FaqAccordion faqs={faqs} />
          </div>
        </div>

        <div className="w-full lg:sticky lg:top-24 lg:h-fit lg:w-80">
          <EnquiryForm
            hospitalId={hospital.id}
            title="Quick Enquiry"
            defaultTreatment={asStringArray(hospital.specialities)[0] || ""}
          />
        </div>
      </div>
    </div>
  );
}
