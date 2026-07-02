import { Metadata } from "next";
import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { AdminLoginForm } from "@/components/forms/AdminLoginForm";
import { StatusBadge } from "@/components/dashboard/StatusBadge";

export const metadata: Metadata = {
  title: "Admin | CARELET",
  robots: { index: false },
};

export default async function AdminPage() {
  const isAdmin = await isAdminAuthenticated();

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-sm px-4 py-16 sm:px-6">
        <h1 className="text-xl font-semibold text-darktext">Admin Sign In</h1>
        <div className="mt-6 rounded-card bg-white p-6 shadow-soft">
          <AdminLoginForm />
        </div>
      </div>
    );
  }

  const [requests, pendingHospitals, pendingDoctors, pendingReviews] = await Promise.all([
    prisma.quoteRequest.findMany({
      include: {
        patient: { select: { id: true, name: true, country: true } },
        reports: true,
        quotes: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.hospital.count({ where: { status: "pending" } }),
    prisma.doctor.count({ where: { status: "pending" } }),
    prisma.review.count({ where: { status: "pending" } }),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-darktext">Admin</h1>

      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href="/admin/hospitals"
          className="rounded-pill bg-white px-4 py-2 text-sm font-medium text-darktext shadow-soft hover:bg-primary/5"
        >
          Hospital Partners {pendingHospitals > 0 && `(${pendingHospitals} pending)`}
        </Link>
        <Link
          href="/admin/doctors"
          className="rounded-pill bg-white px-4 py-2 text-sm font-medium text-darktext shadow-soft hover:bg-primary/5"
        >
          Doctor Approvals {pendingDoctors > 0 && `(${pendingDoctors} pending)`}
        </Link>
        <Link
          href="/admin/reviews"
          className="rounded-pill bg-white px-4 py-2 text-sm font-medium text-darktext shadow-soft hover:bg-primary/5"
        >
          Patient Reviews {pendingReviews > 0 && `(${pendingReviews} pending)`}
        </Link>
        <Link
          href="/admin/packages"
          className="rounded-pill bg-white px-4 py-2 text-sm font-medium text-darktext shadow-soft hover:bg-primary/5"
        >
          Packages
        </Link>
      </div>

      <h2 className="mt-8 text-xl font-semibold text-darktext">Quote Requests</h2>
      <p className="mt-1 text-sm text-muted">
        Review patient reports and submit hospital quotes on their behalf.
      </p>

      <div className="mt-6 space-y-3">
        {requests.length === 0 && (
          <p className="text-muted">No quote requests yet.</p>
        )}
        {requests.map((r) => (
          <Link
            key={r.id}
            href={`/admin/requests/${r.id}`}
            className="flex items-center justify-between rounded-card bg-white p-5 shadow-soft hover:bg-primary/5"
          >
            <div>
              <p className="font-medium text-darktext">{r.treatment}</p>
              <p className="mt-1 text-sm text-muted">
                {r.patient.name} ({r.patient.country || "Unknown"}) &middot;{" "}
                {r.reports.length} report{r.reports.length === 1 ? "" : "s"} &middot;{" "}
                {r.quotes.length} quote{r.quotes.length === 1 ? "" : "s"}
              </p>
            </div>
            <StatusBadge status={r.status} />
          </Link>
        ))}
      </div>
    </div>
  );
}
