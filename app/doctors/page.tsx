import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { prisma } from "@/lib/db";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { DoctorCard } from "@/components/sections/DoctorCard";

export const metadata: Metadata = buildMetadata({
  title: "Doctors in Kerala for International Patients",
  description:
    "Meet Kerala's leading specialists in cardiology, orthopaedics, oncology, fertility and Ayurveda treating international patients.",
  keywords: ["Kerala doctors", "best doctors Kerala", "specialist doctors Kerala"],
  path: "/doctors",
});

export default async function DoctorsPage() {
  const doctors = await prisma.doctor.findMany({
    where: { status: "approved" },
    include: { hospital: { select: { name: true, city: true } } },
    orderBy: [{ featured: "desc" }, { experience: "desc" }],
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "Doctors", path: "/doctors" }]} />
      <h1 className="mt-4 text-3xl font-semibold text-darktext">
        Top Doctors in Kerala for International Patients
      </h1>
      <p className="mt-2 max-w-2xl text-muted">
        Internationally trained specialists across cardiology, orthopaedics, oncology,
        fertility and Ayurveda.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
}
