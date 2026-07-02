import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/PageSEO";
import { breadcrumbJsonLd } from "@/lib/seo";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const allItems = [{ name: "Home", path: "/" }, ...items];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(allItems)} />
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted">
        {allItems.map((item, i) => (
          <span key={item.path} className="flex items-center gap-1">
            {i > 0 && <ChevronRight size={14} />}
            {i === allItems.length - 1 ? (
              <span className="text-darktext">{item.name}</span>
            ) : (
              <Link href={item.path} className="hover:text-primary">
                {item.name}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
