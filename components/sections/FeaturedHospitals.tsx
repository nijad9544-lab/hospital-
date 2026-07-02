import { prisma } from "@/lib/db";
import { HospitalCard } from "@/components/sections/HospitalCard";
import { LinkButton } from "@/components/ui/Button";

export async function FeaturedHospitals() {
  const hospitals = await prisma.hospital.findMany({
    where: { featured: true, status: "approved" },
    take: 4,
    orderBy: { rating: "desc" },
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold text-darktext">Featured Hospitals</h2>
        <LinkButton href="/hospitals" variant="ghost" size="sm">
          View all hospitals
        </LinkButton>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {hospitals.map((hospital) => (
          <HospitalCard key={hospital.id} hospital={hospital} />
        ))}
      </div>
    </section>
  );
}
