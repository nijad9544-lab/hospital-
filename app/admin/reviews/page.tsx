import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Star } from "lucide-react";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SITE_URL } from "@/lib/seo";
import { ApprovalStatusBadge } from "@/components/dashboard/ApprovalStatusBadge";
import { ApprovalActions } from "@/components/dashboard/ApprovalActions";
import { ReviewLinkShareBox } from "@/components/dashboard/ReviewLinkShareBox";

export const metadata: Metadata = {
  title: "Patient Reviews | Admin",
  robots: { index: false },
};

export default async function AdminReviewsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin");

  const reviews = await prisma.review.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-darktext">Patient Reviews</h1>
      <p className="mt-1 text-sm text-muted">
        Approve or reject submitted reviews. Approved reviews appear on the homepage.
      </p>

      <div className="mt-6">
        <ReviewLinkShareBox url={`${SITE_URL}/reviews/new`} />
      </div>

      <div className="mt-6 space-y-3">
        {reviews.length === 0 && <p className="text-sm text-muted">No reviews submitted yet.</p>}
        {reviews.map((r) => (
          <div key={r.id} className="rounded-card bg-white p-5 shadow-soft">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < r.rating ? "fill-secondary text-secondary" : "fill-none text-muted/40"}
                    />
                  ))}
                </div>
                <p className="mt-1 font-medium text-darktext">
                  {r.name} {r.country && <span className="text-muted">&middot; {r.country}</span>}
                </p>
                {r.treatment && <p className="text-xs text-muted">{r.treatment}</p>}
                <p className="mt-2 text-sm text-darktext">{r.quote}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <ApprovalStatusBadge status={r.status} />
                {r.status === "pending" && (
                  <ApprovalActions endpoint={`/api/admin/reviews/${r.id}/status`} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
