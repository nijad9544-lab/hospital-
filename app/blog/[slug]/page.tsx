import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { prisma } from "@/lib/db";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { asStringArray } from "@/lib/types";
import { estimateReadTime, extractHeadings, slugifyHeading } from "@/lib/blog";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ShareButtons } from "@/components/sections/ShareButtons";
import { JsonLd } from "@/components/seo/PageSEO";

export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({ select: { slug: true } });
  return posts.map((p) => ({ slug: p.slug }));
}

async function getPost(slug: string) {
  return prisma.blogPost.findUnique({ where: { slug } });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};

  return buildMetadata({
    title: post.metaTitle || post.title,
    description: post.metaDesc || post.excerpt,
    keywords: asStringArray(post.tags),
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const readTime = estimateReadTime(post.content);
  const headings = extractHeadings(post.content);
  const url = `${SITE_URL}/blog/${post.slug}`;

  const relatedPosts = await prisma.blogPost.findMany({
    where: { category: post.category, slug: { not: post.slug } },
    take: 3,
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt.toISOString(),
          author: post.authorTitle
            ? { "@type": "Person", name: post.authorName, jobTitle: post.authorTitle }
            : { "@type": "Organization", name: post.authorName },
          url,
        }}
      />

      <Breadcrumbs
        items={[
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      <div className="mt-4 flex flex-col gap-10 lg:flex-row">
        <article className="flex-1">
          <Badge variant="primary">{post.category}</Badge>
          <h1 className="mt-3 text-3xl font-semibold text-darktext">{post.title}</h1>
          <p className="mt-2 text-sm text-muted">
            {readTime} min read &middot; {post.publishedAt.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="mt-6 max-w-none space-y-4 text-darktext [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-darktext [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_p]:leading-relaxed [&_p]:text-muted [&_ul]:list-disc [&_ul]:pl-5 [&_li]:text-muted">
            <ReactMarkdown
              components={{
                h2: ({ children }) => {
                  const text = String(children);
                  return <h2 id={slugifyHeading(text)}>{children}</h2>;
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <div className="mt-10 border-t border-muted/15 pt-6">
            <h2 className="text-sm font-semibold text-darktext">Share this article</h2>
            <div className="mt-3">
              <ShareButtons title={post.title} url={url} />
            </div>
          </div>

          <div className="mt-8 rounded-card bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold text-darktext">{post.authorName}</p>
            {post.authorTitle && <p className="text-xs text-muted">{post.authorTitle}</p>}
            <p className="mt-1 text-sm text-muted">
              {post.authorBio ||
                "Our editorial team works with hospital partners and Ayurveda physicians across Kerala to bring you accurate, up-to-date medical tourism guides."}
            </p>
          </div>

          {relatedPosts.length > 0 && (
            <div className="mt-10">
              <h2 className="text-lg font-semibold text-darktext">Related Posts</h2>
              <ul className="mt-4 space-y-2">
                {relatedPosts.map((p) => (
                  <li key={p.id}>
                    <Link href={`/blog/${p.slug}`} className="text-primary hover:underline">
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>

        {headings.length > 0 && (
          <aside className="w-full shrink-0 lg:w-56">
            <div className="rounded-card bg-white p-4 shadow-soft lg:sticky lg:top-24">
              <h2 className="text-sm font-semibold text-darktext">Table of Contents</h2>
              <ul className="mt-3 space-y-2">
                {headings.map((h) => (
                  <li key={h}>
                    <a
                      href={`#${slugifyHeading(h)}`}
                      className="text-sm text-muted hover:text-primary"
                    >
                      {h}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
