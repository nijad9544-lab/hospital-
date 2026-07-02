import { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ApprovalStatusBadge } from "@/components/dashboard/ApprovalStatusBadge";
import { ApprovalActions } from "@/components/dashboard/ApprovalActions";

export const metadata: Metadata = {
  title: "Doctor Approvals | Admin",
  robots: { index: false },
};

export default async function AdminDoctorsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin");

  const doctors = await prisma.doctor.findMany({
    include: { hospital: { select: { name: true, city: true } } },
    orderBy: [{ status: "asc" }],
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-darktext">Doctor Approvals</h1>
      <p className="mt-1 text-sm text-muted">
        Approve or reject doctors added by hospital partners.
      </p>

      <div className="mt-6 space-y-3">
        {doctors.map((d) => (
          <div key={d.id} className="flex items-center justify-between rounded-card bg-white p-5 shadow-soft">
            <div>
              <p className="font-medium text-darktext">{d.title} {d.name}</p>
              <p className="mt-1 text-sm text-muted">
                {d.speciality} &middot; {d.hospital.name}, {d.hospital.city}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ApprovalStatusBadge status={d.status} />
              {d.status === "pending" && (
                <ApprovalActions endpoint={`/api/admin/doctors/${d.id}/status`} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
