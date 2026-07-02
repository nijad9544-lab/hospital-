"use client";

import { useState } from "react";
import { Copy, Mail } from "lucide-react";

export function ReviewLinkShareBox({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const waText = encodeURIComponent(
    `We'd love to hear about your experience with CARELET. Please share a quick review here: ${url}`
  );
  const mailBody = encodeURIComponent(
    `Hi,\n\nWe'd love to hear about your experience with CARELET. Please share a quick review here:\n${url}\n\nThank you!`
  );

  return (
    <div className="rounded-card bg-white p-5 shadow-soft">
      <h3 className="text-sm font-semibold text-darktext">Send this link to a patient</h3>
      <p className="mt-1 text-sm text-muted">
        Anyone with this link can submit a review. New submissions are held for approval
        below before they appear on the site.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <code className="flex-1 truncate rounded-btn bg-offwhite px-3 py-2 text-sm text-darktext">
          {url}
        </code>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-pill border border-muted/20 px-4 py-2 text-sm font-medium text-darktext hover:bg-offwhite"
        >
          <Copy size={14} /> {copied ? "Copied!" : "Copy link"}
        </button>
        <a
          href={`https://wa.me/?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-pill border border-muted/20 px-4 py-2 text-sm font-medium text-darktext hover:bg-offwhite"
        >
          WhatsApp
        </a>
        <a
          href={`mailto:?subject=Share your experience with CARELET&body=${mailBody}`}
          className="flex items-center gap-1.5 rounded-pill border border-muted/20 px-4 py-2 text-sm font-medium text-darktext hover:bg-offwhite"
        >
          <Mail size={14} /> Email
        </a>
      </div>
    </div>
  );
}
