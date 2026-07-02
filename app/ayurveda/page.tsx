import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { prisma } from "@/lib/db";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PackageCard } from "@/components/sections/PackageCard";
import { DoctorCard } from "@/components/sections/DoctorCard";
import { QuoteForm } from "@/components/forms/QuoteForm";

export const metadata: Metadata = buildMetadata({
  title: "Ayurveda & Wellness in Kerala",
  description:
    "Discover authentic Panchakarma and Ayurveda wellness packages in Kerala, the birthplace of traditional Ayurvedic medicine.",
  keywords: ["Ayurveda Kerala", "Panchakarma Kerala", "Kerala wellness retreat"],
  path: "/ayurveda",
});

export default async function AyurvedaPage() {
  const [packages, doctors] = await Promise.all([
    prisma.package.findMany({ where: { category: "ayurveda" } }),
    prisma.doctor.findMany({ where: { speciality: { contains: "Ayurveda" }, status: "approved" } }),
  ]);

  return (
    <div>
      <section className="bg-primary/5 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Breadcrumbs items={[{ name: "Ayurveda", path: "/ayurveda" }]} />
          <h1 className="mt-4 text-4xl font-semibold text-darktext">
            Authentic Ayurveda & Wellness in Kerala
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Kerala is the birthplace of traditional Panchakarma. Our physician-supervised
            wellness programs combine ancient therapies with modern hospitality.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-darktext">Ayurveda Packages</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

      {doctors.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-darktext">Ayurveda Physicians</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </section>
      )}

      <section className="bg-white py-16">
        <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
          <QuoteForm />
        </div>
      </section>
    </div>
  );
}
