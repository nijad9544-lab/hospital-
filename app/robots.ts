import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Deliberate choice: AI crawlers are explicitly allowed (not just covered by the
// wildcard) so content can be crawled, cited, and grounded by AI answer engines
// (e.g. Gemini/AI Overviews). Flip these to "disallow" if you later decide you
// don't want this content used for AI training/answers.
const AI_CRAWLERS = ["Google-Extended", "GPTBot", "ChatGPT-User", "ClaudeBot", "anthropic-ai", "PerplexityBot", "CCBot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: "/api/",
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
