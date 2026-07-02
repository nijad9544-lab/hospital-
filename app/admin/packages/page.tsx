import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus, Pencil } from "lucide-react";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { DeleteButton } from "@/components/dashboard/DeleteButton";

export const metadata: Metadata = {
  title: "Packages | Admin",
  robots: { index: false },
};

export default async function AdminPackagesPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin");

  const packages = await prisma.package.findMany({
    include: { hospital: { select: { name: true, city: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-darktext">Packages</h1>
          <p className="mt-1 text-sm text-muted">
            All medical, Ayurveda, combo and stay packages listed on the site.
          </p>
        </div>
        <LinkButton href="/admin/packages/new" size="sm">
          <Plus size={16} /> Add Package
        </LinkButton>
      </div>

      <div className="mt-6 space-y-3">
        {packages.length === 0 && <p className="text-sm text-muted">No packages yet.</p>}
        {packages.map((p) => (
          <div key={p.id} className="flex items-center justify-between rounded-card bg-white p-5 shadow-soft">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="capitalize">{p.category}</Badge>
                {p.featured && <Badge variant="primary">Featured</Badge>}
                {p.popular && <Badge variant="outline">Popular</Badge>}
              </div>
              <p className="mt-1 font-medium text-darktext">{p.name}</p>
              <p className="text-sm text-muted">
                {p.duration} &middot; {p.city}
                {p.hospital && <> &middot; {p.hospital.name}</>}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Price amountInINR={p.price} className="font-semibold text-primary" />
              <Link
                href={`/admin/packages/${p.id}/edit`}
                className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                <Pencil size={14} /> Edit
              </Link>
              <DeleteButton
                endpoint={`/api/admin/packages/${p.id}`}
                confirmMessage={`Delete "${p.name}"? This cannot be undone.`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
