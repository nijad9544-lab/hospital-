import { Star } from "lucide-react";

export function StarRating({
  rating,
  reviewCount,
  size = 16,
}: {
  rating: number;
  reviewCount?: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={
              i < Math.round(rating)
                ? "fill-secondary text-secondary"
                : "fill-none text-muted/40"
            }
          />
        ))}
      </div>
      <span className="text-sm font-medium text-darktext">{rating.toFixed(1)}</span>
      {typeof reviewCount === "number" && (
        <span className="text-sm text-muted">({reviewCount})</span>
      )}
    </div>
  );
}
