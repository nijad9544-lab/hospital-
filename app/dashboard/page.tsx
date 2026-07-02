import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus, Sparkles } from "lucide-react";
import { getCurrentPatient } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { LinkButton } from "@/components/ui/Button";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { LogoutButton } from "@/components/dashboard/LogoutButton";

export const metadata: Metadata = {
  title: "My Dashboard | CARELET",
  robots: { index: false },
};

export default async function DashboardPage() {
  const patient = await getCurrentPatient();
  if (!patient) redirect("/login");

  const requests = await prisma.quoteRequest.findMany({
    where: { patientId: patient.id },
    include: { quotes: true, reports: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-darktext">Welcome, {patient.name}</h1>
          <p className="mt-1 text-sm text-muted">
            Track your treatment quote requests and compare hospital offers.
          </p>
        </div>
        <LogoutButton />
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <LinkButton href="/dashboard/concierge" variant="outline" size="sm">
          <Sparkles size={16} /> AI Concierge
        </LinkButton>
        <LinkButton href="/dashboard/requests/new" size="sm">
          <Plus size={16} /> New Quote Request
        </LinkButton>
      </div>

      <div className="mt-6 space-y-3">
        {requests.length === 0 && (
          <div className="rounded-card bg-white p-8 text-center shadow-soft">
            <p className="text-muted">
              You haven&apos;t submitted any quote requests yet. Start by requesting an
              estimate for your treatment.
            </p>
          </div>
        )}

        {requests.map((r) => (
          <Link
            key={r.id}
            href={`/dashboard/requests/${r.id}`}
            className="flex items-center justify-between rounded-card bg-white p-5 shadow-soft hover:bg-primary/5"
          >
            <div>
              <p className="font-medium text-darktext">{r.treatment}</p>
              <p className="mt-1 text-sm text-muted">
                {r.reports.length} report{r.reports.length === 1 ? "" : "s"} uploaded &middot;{" "}
                {r.quotes.length} quote{r.quotes.length === 1 ? "" : "s"} received
              </p>
            </div>
            <StatusBadge status={r.status} />
          </Link>
        ))}
      </div>
    </div>
  );
}
