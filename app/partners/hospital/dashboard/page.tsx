import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentHospital } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ApprovalStatusBadge } from "@/components/dashboard/ApprovalStatusBadge";
import { LogoutButton } from "@/components/dashboard/LogoutButton";

export const metadata: Metadata = {
  title: "Hospital Dashboard | CARELET",
  robots: { index: false },
};

export default async function HospitalDashboardPage() {
  const hospital = await getCurrentHospital();
  if (!hospital) redirect("/partners/login");

  const [openLeads, doctorCount, quoteCount] = await Promise.all([
    prisma.quoteRequest.count({ where: { status: { not: "closed" } } }),
    prisma.doctor.count({ where: { hospitalId: hospital.id } }),
    prisma.hospitalQuote.count({ where: { hospitalId: hospital.id } }),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-darktext">{hospital.name}</h1>
          <div className="mt-2">
            <ApprovalStatusBadge status={hospital.status} />
          </div>
        </div>
        <LogoutButton endpoint="/api/hospital-auth/logout" redirectTo="/partners/login" />
      </div>

      {hospital.status === "pending" && (
        <div className="mt-6 rounded-card bg-secondary/10 p-4 text-sm text-darktext">
          Your application is under review. Your hospital profile and doctors won&apos;t
          appear publicly until an admin approves your account.
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link href="/partners/hospital/dashboard/leads" className="rounded-card bg-white p-5 shadow-soft hover:bg-primary/5">
          <p className="text-2xl font-semibold text-primary">{openLeads}</p>
          <p className="mt-1 text-sm text-muted">Open patient leads</p>
        </Link>
        <Link href="/partners/hospital/dashboard/doctors" className="rounded-card bg-white p-5 shadow-soft hover:bg-primary/5">
          <p className="text-2xl font-semibold text-primary">{doctorCount}</p>
          <p className="mt-1 text-sm text-muted">Doctors on your team</p>
        </Link>
        <div className="rounded-card bg-white p-5 shadow-soft">
          <p className="text-2xl font-semibold text-primary">{quoteCount}</p>
          <p className="mt-1 text-sm text-muted">Quotes submitted</p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Link href="/partners/hospital/dashboard/profile" className="text-sm font-medium text-primary hover:underline">
          Edit hospital profile
        </Link>
        <Link href="/partners/hospital/dashboard/doctors" className="text-sm font-medium text-primary hover:underline">
          Manage doctors
        </Link>
        <Link href="/partners/hospital/dashboard/leads" className="text-sm font-medium text-primary hover:underline">
          View leads
        </Link>
      </div>
    </div>
  );
}
