import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus, Pencil } from "lucide-react";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ApprovalStatusBadge } from "@/components/dashboard/ApprovalStatusBadge";
import { ApprovalActions } from "@/components/dashboard/ApprovalActions";
import { DeleteButton } from "@/components/dashboard/DeleteButton";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Hospital Partners | Admin",
  robots: { index: false },
};

export default async function AdminHospitalsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin");

  const hospitals = await prisma.hospital.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-darktext">Hospital Partners</h1>
          <p className="mt-1 text-sm text-muted">
            Approve or reject hospital signup applications.
          </p>
        </div>
        <LinkButton href="/admin/hospitals/new" size="sm">
          <Plus size={16} /> Add Hospital
        </LinkButton>
      </div>

      <div className="mt-6 space-y-3">
        {hospitals.map((h) => (
          <div key={h.id} className="flex items-center justify-between rounded-card bg-white p-5 shadow-soft">
            <div>
              <p className="font-medium text-darktext">{h.name}</p>
              <p className="mt-1 text-sm text-muted">{h.city} &middot; {h.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <ApprovalStatusBadge status={h.status} />
              {h.status === "pending" && (
                <ApprovalActions endpoint={`/api/admin/hospitals/${h.id}/status`} />
              )}
              <Link
                href={`/admin/hospitals/${h.id}/edit`}
                className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                <Pencil size={14} /> Edit
              </Link>
              <DeleteButton
                endpoint={`/api/admin/hospitals/${h.id}`}
                confirmMessage={`Delete "${h.name}"? Its doctors will be removed and any linked packages will be unlinked. This cannot be undone.`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
