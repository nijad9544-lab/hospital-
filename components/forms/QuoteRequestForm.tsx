"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function QuoteRequestForm() {
  const router = useRouter();
  const [treatment, setTreatment] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...selected].slice(0, 5));
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (treatment.trim().length < 2) {
      setError("Please describe the treatment you need.");
      return;
    }

    setSubmitting(true);

    const formData = new FormData();
    formData.set("treatment", treatment);
    formData.set("message", message);
    files.forEach((f) => formData.append("reports", f));

    const res = await fetch("/api/quote-requests", { method: "POST", body: formData });

    if (!res.ok) {
      const body = await res.json();
      setError(body.error?.formErrors?.[0] || "Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }

    const data = await res.json();
    router.push(`/dashboard/requests/${data.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-btn bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium text-darktext">
          Treatment you need
        </label>
        <input
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
          placeholder="e.g. Knee Replacement, Cardiac Bypass, Panchakarma Detox"
          className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-darktext">
          Additional details (optional)
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="Describe your symptoms, prior diagnosis, or any specific requirements"
          className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-darktext">
          Upload medical reports (PDF, JPG, PNG &mdash; up to 5 files, 10MB each)
        </label>
        <label className="flex cursor-pointer flex-col items-center gap-2 rounded-card border-2 border-dashed border-primary/30 bg-primary/5 px-4 py-8 text-center hover:bg-primary/10">
          <UploadCloud className="text-primary" size={28} />
          <span className="text-sm text-muted">Click to select files or drag and drop</span>
          <input
            type="file"
            multiple
            accept="application/pdf,image/jpeg,image/png"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((f, i) => (
              <li
                key={`${f.name}-${i}`}
                className="flex items-center justify-between rounded-btn bg-offwhite px-3 py-2 text-sm text-darktext"
              >
                <span className="truncate">{f.name}</span>
                <button type="button" onClick={() => removeFile(i)} className="text-muted hover:text-red-600">
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Submitting..." : "Submit Quote Request"}
      </Button>
    </form>
  );
}
