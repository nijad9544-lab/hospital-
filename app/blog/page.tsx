import { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { prisma } from "@/lib/db";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = buildMetadata({
  title: "Blog - Medical Tourism Guides & Insights",
  description:
    "Read in-depth guides on medical tourism costs, Ayurveda packages, hospital comparisons and treatment cost breakdowns for Kerala.",
  keywords: ["medical tourism blog", "Kerala healthcare blog", "Ayurveda guides"],
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" } });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "Blog", path: "/blog" }]} />
      <h1 className="mt-4 text-3xl font-semibold text-darktext">
        Medical Tourism Guides & Insights
      </h1>
      <p className="mt-2 max-w-2xl text-muted">
        In-depth guides on costs, Ayurveda, hospitals and treatment comparisons for
        Kerala medical tourism.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <Card className="h-full p-5 transition-transform hover:-translate-y-1">
              <Badge variant="primary">{post.category}</Badge>
              <h2 className="mt-3 text-lg font-semibold text-darktext">{post.title}</h2>
              <p className="mt-2 line-clamp-3 text-sm text-muted">{post.excerpt}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
