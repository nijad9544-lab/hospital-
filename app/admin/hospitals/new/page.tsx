import { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { AdminHospitalCreateForm } from "@/components/forms/AdminHospitalCreateForm";

export const metadata: Metadata = {
  title: "Add Hospital | Admin",
  robots: { index: false },
};

export default async function AdminAddHospitalPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin");

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-darktext">Add Hospital</h1>
      <p className="mt-1 text-sm text-muted">
        Manually add a hospital partner. It will be marked approved and visible
        immediately.
      </p>

      <div className="mt-6 rounded-card bg-white p-6 shadow-soft">
        <AdminHospitalCreateForm />
      </div>
    </div>
  );
}
