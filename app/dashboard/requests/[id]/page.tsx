import { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { FileText } from "lucide-react";
import { getCurrentPatient } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { StarRating } from "@/components/ui/StarRating";

export const metadata: Metadata = {
  title: "Quote Request Details | CARELET",
  robots: { index: false },
};

export default async function QuoteRequestDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const patient = await getCurrentPatient();
  if (!patient) redirect("/login");

  const request = await prisma.quoteRequest.findUnique({
    where: { id: params.id },
    include: {
      reports: true,
      quotes: { include: { hospital: true }, orderBy: { price: "asc" } },
    },
  });

  if (!request || request.patientId !== patient.id) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-darktext">{request.treatment}</h1>
        <StatusBadge status={request.status} />
      </div>
      {request.message && <p className="mt-2 text-muted">{request.message}</p>}
      <p className="mt-1 text-sm text-muted">
        Submitted on {request.createdAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <h2 className="mt-8 text-lg font-semibold text-darktext">Uploaded Reports</h2>
      {request.reports.length === 0 ? (
        <p className="mt-2 text-sm text-muted">No reports uploaded for this request.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {request.reports.map((r) => (
            <li key={r.id}>
              <a
                href={`/api/reports/${r.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-btn bg-white px-4 py-3 text-sm text-darktext shadow-soft hover:bg-primary/5"
              >
                <FileText size={16} className="text-primary" /> {r.fileName}
              </a>
            </li>
          ))}
        </ul>
      )}

      <h2 className="mt-8 text-lg font-semibold text-darktext">Hospital Quotes</h2>
      {request.quotes.length === 0 ? (
        <div className="mt-3 rounded-card bg-white p-6 text-center shadow-soft">
          <p className="text-sm text-muted">
            Our care coordinators are reviewing your reports. Hospital quotes typically
            arrive within 48 hours.
          </p>
        </div>
      ) : (
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {request.quotes.map((q) => (
            <div key={q.id} className="rounded-card bg-white p-5 shadow-soft">
              <p className="font-semibold text-darktext">{q.hospital.name}</p>
              <p className="text-sm text-muted">{q.hospital.city}, Kerala</p>
              <div className="mt-2">
                <StarRating rating={q.hospital.rating} reviewCount={q.hospital.reviewCount} />
              </div>
              <p className="mt-3 text-xl font-semibold text-primary">
                {q.currency} {q.price.toLocaleString("en-IN")}
              </p>
              {q.notes && <p className="mt-2 text-sm text-muted">{q.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
