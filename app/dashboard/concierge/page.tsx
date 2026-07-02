import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentPatient } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ConciergePanel } from "@/components/dashboard/ConciergePanel";

export const metadata: Metadata = {
  title: "AI Medical Concierge | CARELET",
  robots: { index: false },
};

export default async function ConciergePage() {
  const patient = await getCurrentPatient();
  if (!patient) redirect("/login");

  const requests = await prisma.quoteRequest.findMany({
    where: { patientId: patient.id },
    select: { id: true, treatment: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-darktext">AI Medical Concierge</h1>
      <p className="mt-2 text-sm text-muted">
        Get an instant preliminary summary of your case, an estimated cost range, and
        hospital recommendations &mdash; before your case is reviewed by our care team.
      </p>

      <div className="mt-6">
        <ConciergePanel requests={requests} />
      </div>
    </div>
  );
}
