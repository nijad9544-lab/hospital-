import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentPatient } from "@/lib/auth";
import { QuoteRequestForm } from "@/components/forms/QuoteRequestForm";

export const metadata: Metadata = {
  title: "Request a Treatment Quote | CARELET",
  robots: { index: false },
};

export default async function NewQuoteRequestPage() {
  const patient = await getCurrentPatient();
  if (!patient) redirect("/login");

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-darktext">Request a Treatment Quote</h1>
      <p className="mt-2 text-sm text-muted">
        Upload your medical reports once and our care coordinators will get back to you
        with quotes from multiple Kerala hospitals within 48 hours.
      </p>

      <div className="mt-6 rounded-card bg-white p-6 shadow-soft">
        <QuoteRequestForm />
      </div>
    </div>
  );
}
