"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { asStringArray } from "@/lib/types";

interface QuoteRequestOption {
  id: string;
  treatment: string;
}

interface AnalysisResult {
  analysis: {
    extractedInfo: string;
    treatmentSummary: string;
    estimatedCostRange: string;
    recommendedTreatmentCategory: string;
    source: "openai" | "stub";
  };
  recommendedHospitals: {
    id: string;
    slug: string;
    name: string;
    city: string;
    rating: number;
    reviewCount: number;
    specialities: string;
  }[];
}

export function ConciergePanel({ requests }: { requests: QuoteRequestOption[] }) {
  const [selectedId, setSelectedId] = useState(requests[0]?.id || "");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAnalyze() {
    setLoading(true);
    setError(null);
    setResult(null);

    const res = await fetch("/api/ai/concierge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quoteRequestId: selectedId }),
    });

    if (!res.ok) {
      setError("Could not analyze your case right now. Please try again.");
      setLoading(false);
      return;
    }

    setResult(await res.json());
    setLoading(false);
  }

  if (requests.length === 0) {
    return (
      <div className="rounded-card bg-white p-6 text-center shadow-soft">
        <p className="text-sm text-muted">
          You don&apos;t have any quote requests yet. Submit one first to use the AI
          Concierge.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-card bg-white p-6 shadow-soft">
        <label className="mb-1 block text-sm font-medium text-darktext">
          Select a quote request to analyze
        </label>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full rounded-btn border border-muted/20 px-4 py-2.5 text-sm outline-none focus:border-primary"
        >
          {requests.map((r) => (
            <option key={r.id} value={r.id}>{r.treatment}</option>
          ))}
        </select>

        <Button onClick={handleAnalyze} disabled={loading} className="mt-4">
          <Sparkles size={16} /> {loading ? "Analyzing..." : "Analyze with AI Concierge"}
        </Button>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </div>

      {result && (
        <div className="space-y-4">
          {result.analysis.source === "stub" && (
            <p className="rounded-btn bg-secondary/10 px-4 py-2 text-xs text-darktext">
              Showing a preview analysis. Connect an OpenAI API key to enable live AI analysis.
            </p>
          )}

          <div className="rounded-card bg-white p-5 shadow-soft">
            <h3 className="text-sm font-semibold text-darktext">What We Understood</h3>
            <p className="mt-2 text-sm text-muted">{result.analysis.extractedInfo}</p>
          </div>

          <div className="rounded-card bg-white p-5 shadow-soft">
            <h3 className="text-sm font-semibold text-darktext">Treatment Summary</h3>
            <p className="mt-2 text-sm text-muted">{result.analysis.treatmentSummary}</p>
          </div>

          <div className="rounded-card bg-white p-5 shadow-soft">
            <h3 className="text-sm font-semibold text-darktext">Estimated Cost Range</h3>
            <p className="mt-2 text-sm font-medium text-primary">{result.analysis.estimatedCostRange}</p>
          </div>

          {result.recommendedHospitals.length > 0 && (
            <div className="rounded-card bg-white p-5 shadow-soft">
              <h3 className="text-sm font-semibold text-darktext">Recommended Hospitals</h3>
              <div className="mt-3 space-y-3">
                {result.recommendedHospitals.map((h) => (
                  <Link
                    key={h.id}
                    href={`/hospitals/${h.slug}`}
                    className="block rounded-btn bg-offwhite p-3 hover:bg-primary/5"
                  >
                    <p className="font-medium text-darktext">{h.name}</p>
                    <p className="text-sm text-muted">{h.city}, Kerala</p>
                    <div className="mt-1">
                      <StarRating rating={h.rating} reviewCount={h.reviewCount} />
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {asStringArray(h.specialities).slice(0, 3).map((s) => (
                        <span key={s} className="text-xs text-muted">{s}</span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
