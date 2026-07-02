import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { FileText } from "lucide-react";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { AdminQuoteForm } from "@/components/forms/AdminQuoteForm";

export const metadata: Metadata = {
  title: "Quote Request | Admin",
  robots: { index: false },
};

export default async function AdminRequestDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) redirect("/admin");

  const request = await prisma.quoteRequest.findUnique({
    where: { id: params.id },
    include: {
      patient: true,
      reports: true,
      quotes: { include: { hospital: true } },
    },
  });

  if (!request) notFound();

  const hospitals = await prisma.hospital.findMany({
    select: { id: true, name: true, city: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-darktext">{request.treatment}</h1>
        <StatusBadge status={request.status} />
      </div>
      {request.message && <p className="mt-2 text-muted">{request.message}</p>}

      <div className="mt-6 rounded-card bg-white p-5 shadow-soft">
        <h2 className="text-sm font-semibold text-darktext">Patient</h2>
        <p className="mt-1 text-sm text-muted">{request.patient.name}</p>
        <p className="text-sm text-muted">{request.patient.email}</p>
        <p className="text-sm text-muted">
          {request.patient.phone} &middot; {request.patient.country}
        </p>
      </div>

      <h2 className="mt-8 text-lg font-semibold text-darktext">Medical Reports</h2>
      {request.reports.length === 0 ? (
        <p className="mt-2 text-sm text-muted">No reports uploaded.</p>
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

      <h2 className="mt-8 text-lg font-semibold text-darktext">Existing Quotes</h2>
      {request.quotes.length === 0 ? (
        <p className="mt-2 text-sm text-muted">No quotes submitted yet.</p>
      ) : (
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {request.quotes.map((q) => (
            <div key={q.id} className="rounded-card bg-white p-4 shadow-soft">
              <p className="font-medium text-darktext">{q.hospital.name}</p>
              <p className="text-sm text-primary">
                {q.currency} {q.price.toLocaleString("en-IN")}
              </p>
              {q.notes && <p className="mt-1 text-sm text-muted">{q.notes}</p>}
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <AdminQuoteForm quoteRequestId={request.id} hospitals={hospitals} />
      </div>
    </div>
  );
}
