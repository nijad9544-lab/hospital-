import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentHospital } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { HospitalQuoteForm } from "@/components/forms/HospitalQuoteForm";

export const metadata: Metadata = {
  title: "Patient Leads | CARELET",
  robots: { index: false },
};

export default async function HospitalLeadsPage() {
  const hospital = await getCurrentHospital();
  if (!hospital) redirect("/partners/login");

  const requests = await prisma.quoteRequest.findMany({
    where: { status: { not: "closed" } },
    include: {
      patient: { select: { name: true, country: true } },
      reports: true,
      quotes: { include: { hospital: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-darktext">Patient Leads</h1>
      <p className="mt-2 text-sm text-muted">
        Open treatment requests from international patients. Submit a quote to be
        considered for the patient&apos;s shortlist.
      </p>

      <div className="mt-6 space-y-4">
        {requests.length === 0 && <p className="text-sm text-muted">No open leads right now.</p>}
        {requests.map((r) => {
          const alreadyQuoted = r.quotes.some((q) => q.hospitalId === hospital.id);
          return (
            <div key={r.id} className="rounded-card bg-white p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-darktext">{r.treatment}</p>
                  <p className="mt-1 text-sm text-muted">
                    {r.patient.name} ({r.patient.country || "Unknown"}) &middot;{" "}
                    {r.reports.length} report{r.reports.length === 1 ? "" : "s"} &middot;{" "}
                    {r.quotes.length} quote{r.quotes.length === 1 ? "" : "s"} received
                  </p>
                  {r.message && <p className="mt-2 text-sm text-darktext">{r.message}</p>}
                </div>
                <StatusBadge status={r.status} />
              </div>

              <div className="mt-4">
                {alreadyQuoted ? (
                  <p className="text-sm text-secondary">You&apos;ve already submitted a quote for this lead.</p>
                ) : (
                  <HospitalQuoteForm quoteRequestId={r.id} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
