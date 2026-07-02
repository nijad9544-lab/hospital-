import { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { AdminPackageCreateForm } from "@/components/forms/AdminPackageCreateForm";

export const metadata: Metadata = {
  title: "Add Package | Admin",
  robots: { index: false },
};

export default async function AdminAddPackagePage() {
  if (!(await isAdminAuthenticated())) redirect("/admin");

  const hospitals = await prisma.hospital.findMany({
    where: { status: "approved" },
    select: { id: true, name: true, city: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-darktext">Add Package</h1>
      <p className="mt-1 text-sm text-muted">
        Create a new medical, Ayurveda, combo or stay package. It goes live
        immediately.
      </p>

      <div className="mt-6 rounded-card bg-white p-6 shadow-soft">
        <AdminPackageCreateForm hospitals={hospitals} />
      </div>
    </div>
  );
}
