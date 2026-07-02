import { prisma } from "@/lib/db";
import { PackageCard } from "@/components/sections/PackageCard";
import { LinkButton } from "@/components/ui/Button";

export async function PackageCards() {
  const packages = await prisma.package.findMany({
    where: { featured: true },
    take: 3,
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold text-darktext">Featured Packages</h2>
        <LinkButton href="/packages" variant="ghost" size="sm">
          View all packages
        </LinkButton>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </section>
  );
}
