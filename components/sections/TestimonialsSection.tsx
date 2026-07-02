import Link from "next/link";
import { prisma } from "@/lib/db";
import { StarRating } from "@/components/ui/StarRating";
import { JsonLd } from "@/components/seo/PageSEO";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { ReviewsMarquee } from "@/components/sections/ReviewsMarquee";

export async function TestimonialsSection() {
  const reviews = await prisma.review.findMany({
    where: { status: "approved" },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  const averageRating =
    reviews.length > 0
      ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10
      : null;

  return (
    <section className="bg-white py-16">
      {reviews.map((r) => (
        <JsonLd
          key={r.id}
          data={{
            "@context": "https://schema.org",
            "@type": "Review",
            itemReviewed: {
              "@type": "Organization",
              name: SITE_NAME,
              url: SITE_URL,
            },
            author: { "@type": "Person", name: r.name },
            reviewRating: {
              "@type": "Rating",
              ratingValue: r.rating,
              bestRating: "5",
            },
            reviewBody: r.quote,
            datePublished: r.createdAt.toISOString(),
          }}
        />
      ))}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-semibold text-darktext">
          What Our Patients Say
        </h2>
        {averageRating !== null && (
          <div className="mt-3 flex items-center justify-center gap-2">
            <StarRating rating={averageRating} />
            <span className="text-sm text-muted">
              Rated {averageRating}/5 from{" "}
              <span className="font-medium text-darktext">
                {reviews.length} patient{reviews.length === 1 ? "" : "s"}
              </span>
            </span>
          </div>
        )}

        <div className="mt-10">
          {reviews.length === 0 ? (
            <p className="text-center text-muted">
              No patient reviews yet.{" "}
              <Link href="/reviews/new" className="font-medium text-primary hover:underline">
                Be the first to share your experience
              </Link>
              .
            </p>
          ) : (
            <ReviewsMarquee reviews={reviews} />
          )}
        </div>

        <p className="mt-6 text-center">
          <Link href="/reviews/new" className="text-sm font-medium text-primary hover:underline">
            Share your own experience &rarr;
          </Link>
        </p>
      </div>
    </section>
  );
}
