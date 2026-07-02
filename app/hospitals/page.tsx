import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { prisma, SAFE_HOSPITAL_SELECT } from "@/lib/db";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { HospitalsExplorer } from "@/components/sections/HospitalsExplorer";

export const metadata: Metadata = buildMetadata({
  title: "Hospitals in Kerala for International Patients",
  description:
    "Browse NABH & JCI accredited hospitals across Kerala — compare specialities, accreditation, ratings and book a consultation.",
  keywords: ["Kerala hospitals", "NABH hospitals Kerala", "JCI hospitals Kerala"],
  path: "/hospitals",
});

export default async function HospitalsPage() {
  const hospitals = await prisma.hospital.findMany({
    where: { status: "approved" },
    orderBy: [{ featured: "desc" }, { rating: "desc" }],
    select: SAFE_HOSPITAL_SELECT,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "Hospitals", path: "/hospitals" }]} />
      <h1 className="mt-4 text-3xl font-semibold text-darktext">
        Top Hospitals in Kerala for International Patients
      </h1>
      <p className="mt-2 max-w-2xl text-muted">
        Compare NABH and JCI accredited hospitals across Kochi, Thiruvananthapuram,
        Kozhikode and Thrissur for your treatment.
      </p>

      <HospitalsExplorer hospitals={hospitals} />
    </div>
  );
}
