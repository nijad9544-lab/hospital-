"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface HospitalOption {
  id: string;
  name: string;
  city: string;
}

export function AdminQuoteForm({
  quoteRequestId,
  hospitals,
}: {
  quoteRequestId: string;
  hospitals: HospitalOption[];
}) {
  const router = useRouter();
  const [hospitalId, setHospitalId] = useState(hospitals[0]?.id || "");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const res = await fetch(`/api/admin/quote-requests/${quoteRequestId}/quotes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hospitalId, price, currency, notes }),
    });

    if (!res.ok) {
      setError("Could not add quote. Check the price and try again.");
      setSubmitting(false);
      return;
    }

    setPrice("");
    setNotes("");
    setSubmitting(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-card bg-white p-5 shadow-soft">
      <h3 className="text-sm font-semibold text-darktext">Add a hospital quote</h3>
      {error && <p className="text-xs text-red-600">{error}</p>}

      <select
        value={hospitalId}
        onChange={(e) => setHospitalId(e.target.value)}
        className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
      >
        {hospitals.map((h) => (
          <option key={h.id} value={h.id}>
            {h.name} &mdash; {h.city}
          </option>
        ))}
      </select>

      <div className="flex gap-2">
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          type="number"
          className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="rounded-btn border border-muted/20 px-3 py-2.5 text-sm outline-none focus:border-primary"
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="AED">AED</option>
          <option value="OMR">OMR</option>
          <option value="QAR">QAR</option>
        </select>
      </div>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes (inclusions, duration, etc.)"
        rows={2}
        className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
      />

      <Button type="submit" disabled={submitting} size="sm">
        {submitting ? "Adding..." : "Add Quote"}
      </Button>
    </form>
  );
}
