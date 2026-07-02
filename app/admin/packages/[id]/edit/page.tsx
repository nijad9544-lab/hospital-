import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { asStringArray, asItinerary } from "@/lib/types";
import { AdminPackageCreateForm } from "@/components/forms/AdminPackageCreateForm";

export const metadata: Metadata = {
  title: "Edit Package | Admin",
  robots: { index: false },
};

export default async function AdminEditPackagePage({
  params,
}: {
  params: { id: string };
}) {
  if (!(await isAdminAuthenticated())) redirect("/admin");

  const [pkg, hospitals] = await Promise.all([
    prisma.package.findUnique({ where: { id: params.id } }),
    prisma.hospital.findMany({
      where: { status: "approved" },
      select: { id: true, name: true, city: true },
      orderBy: { name: "asc" },
    }),
  ]);

  if (!pkg) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-darktext">Edit Package</h1>
      <p className="mt-1 text-sm text-muted">{pkg.name}</p>

      <div className="mt-6 rounded-card bg-white p-6 shadow-soft">
        <AdminPackageCreateForm
          hospitals={hospitals}
          packageId={pkg.id}
          initialValues={{
            name: pkg.name,
            category: pkg.category,
            description: pkg.description,
            duration: pkg.duration,
            city: pkg.city,
            price: pkg.price,
            currency: pkg.currency,
            inclusions: asStringArray(pkg.inclusions).join(", "),
            tags: asStringArray(pkg.tags).join(", "),
            hospitalId: pkg.hospitalId || "",
            imageUrl: pkg.imageUrl || "",
            featured: pkg.featured,
            popular: pkg.popular,
            itinerary: asItinerary(pkg.itinerary),
          }}
        />
      </div>
    </div>
  );
}
