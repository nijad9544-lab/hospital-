import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ReviewForm } from "@/components/forms/ReviewForm";

export const metadata: Metadata = buildMetadata({
  title: "Share Your Experience",
  description: "Share your experience with CARELET and help other international patients choose the right care in Kerala.",
  path: "/reviews/new",
});

export default function SubmitReviewPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-semibold text-darktext">Share Your Experience</h1>
      <p className="mt-2 text-sm text-muted">
        Your feedback helps future patients choose the right hospital and treatment in
        Kerala. It only takes a minute.
      </p>

      <div className="mt-6 rounded-card bg-white p-6 shadow-soft">
        <ReviewForm />
      </div>
    </div>
  );
}
