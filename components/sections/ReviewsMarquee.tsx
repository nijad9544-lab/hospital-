"use client";

import { Star } from "lucide-react";

interface ReviewItem {
  id: string;
  name: string;
  country: string | null;
  treatment: string | null;
  rating: number;
  quote: string;
}

function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <div className="w-80 flex-shrink-0 rounded-card bg-offwhite p-6 shadow-soft">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < review.rating ? "fill-secondary text-secondary" : "fill-none text-muted/40"}
          />
        ))}
      </div>
      <p className="mt-3 text-sm text-muted">&ldquo;{review.quote}&rdquo;</p>
      <div className="mt-4">
        <p className="text-sm font-semibold text-darktext">{review.name}</p>
        <p className="text-xs text-muted">
          {[review.treatment, review.country].filter(Boolean).join(" · ")}
        </p>
      </div>
    </div>
  );
}

export function ReviewsMarquee({ reviews }: { reviews: ReviewItem[] }) {
  // Duplicate the list so the looping animation appears seamless.
  const looped = [...reviews, ...reviews];

  return (
    <div className="overflow-hidden">
      <div className="flex w-max gap-6 animate-marquee">
        {looped.map((review, i) => (
          <ReviewCard key={`${review.id}-${i}`} review={review} />
        ))}
      </div>
    </div>
  );
}
