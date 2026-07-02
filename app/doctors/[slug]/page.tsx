import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { buildMetadata, faqPageJsonLd, SITE_URL } from "@/lib/seo";
import { asStringArray } from "@/lib/types";
import { getDoctorFaqs } from "@/lib/faq";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { JsonLd } from "@/components/seo/PageSEO";

export async function generateStaticParams() {
  const doctors = await prisma.doctor.findMany({
    where: { status: "approved" },
    select: { slug: true },
  });
  return doctors.map((d) => ({ slug: d.slug }));
}

async function getDoctor(slug: string) {
  return prisma.doctor.findFirst({
    where: { slug, status: "approved" },
    include: { hospital: true },
  });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const doctor = await getDoctor(params.slug);
  if (!doctor) return {};

  return buildMetadata({
    title: `${doctor.title} ${doctor.name} - ${doctor.speciality} Specialist`,
    description: doctor.bio.slice(0, 155),
    keywords: [doctor.name, doctor.speciality, "Kerala doctor"],
    path: `/doctors/${doctor.slug}`,
    imageUrl: doctor.imageUrl || undefined,
  });
}

export default async function DoctorDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const doctor = await getDoctor(params.slug);
  if (!doctor) notFound();

  const languages = asStringArray(doctor.languages);
  const faqs = getDoctorFaqs({
    name: doctor.name,
    title: doctor.title,
    speciality: doctor.speciality,
    hospitalName: doctor.hospital.name,
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Physician",
          name: `${doctor.title} ${doctor.name}`,
          url: `${SITE_URL}/doctors/${doctor.slug}`,
          medicalSpecialty: doctor.speciality,
          worksFor: {
            "@type": "Hospital",
            name: doctor.hospital.name,
          },
        }}
      />
      <JsonLd data={faqPageJsonLd(faqs)} />

      <Breadcrumbs
        items={[
          { name: "Doctors", path: "/doctors" },
          { name: doctor.name, path: `/doctors/${doctor.slug}` },
        ]}
      />

      <div className="mt-6 flex flex-col gap-8 sm:flex-row">
        <div className="relative h-56 w-full flex-shrink-0 overflow-hidden rounded-card bg-primary/10 sm:h-64 sm:w-64">
          {doctor.imageUrl && (
            <Image
              src={doctor.imageUrl}
              alt={`${doctor.title} ${doctor.name}, ${doctor.speciality} specialist`}
              fill
              priority
              className="object-cover"
            />
          )}
        </div>

        <div className="flex-1">
          <Badge variant="primary">{doctor.speciality}</Badge>
          <h1 className="mt-3 text-3xl font-semibold text-darktext">
            {doctor.title} {doctor.name}
          </h1>
          <p className="mt-1 text-muted">{doctor.qualification}</p>
          <p className="mt-1 text-muted">{doctor.experience} years experience</p>
          <p className="mt-4 text-darktext">{doctor.bio}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {languages.map((l) => (
              <Badge key={l} variant="outline">{l}</Badge>
            ))}
          </div>

          <Link
            href={`/hospitals/${doctor.hospital.slug}`}
            className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
          >
            Practices at {doctor.hospital.name}, {doctor.hospital.city} &rarr;
          </Link>
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold text-darktext">
        Frequently Asked Questions
      </h2>
      <div className="mt-4">
        <FaqAccordion faqs={faqs} />
      </div>

      <div className="mt-10 max-w-md">
        <EnquiryForm
          hospitalId={doctor.hospitalId}
          defaultTreatment={doctor.speciality}
          title={`Book a Consultation with ${doctor.title} ${doctor.name}`}
        />
      </div>
    </div>
  );
}
