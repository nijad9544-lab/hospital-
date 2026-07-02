export function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function extractHeadings(content: string) {
  const matches = content.matchAll(/^##\s+(.+)$/gm);
  return Array.from(matches).map((m) => m[1].trim());
}

export function slugifyHeading(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
