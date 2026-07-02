"use client";

import { useState } from "react";
import { Copy, Mail } from "lucide-react";

export function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const waText = encodeURIComponent(`${title} - ${url}`);
  const mailSubject = encodeURIComponent(title);
  const mailBody = encodeURIComponent(`Check out this article: ${url}`);

  return (
    <div className="flex items-center gap-3">
      <a
        href={`https://wa.me/?text=${waText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-pill border border-muted/20 px-4 py-2 text-sm font-medium text-darktext hover:bg-offwhite"
      >
        WhatsApp
      </a>
      <a
        href={`mailto:?subject=${mailSubject}&body=${mailBody}`}
        className="flex items-center gap-1.5 rounded-pill border border-muted/20 px-4 py-2 text-sm font-medium text-darktext hover:bg-offwhite"
      >
        <Mail size={14} /> Email
      </a>
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 rounded-pill border border-muted/20 px-4 py-2 text-sm font-medium text-darktext hover:bg-offwhite"
      >
        <Copy size={14} /> {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}
