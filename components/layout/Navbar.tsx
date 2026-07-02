"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Heart } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { CurrencySwitcher } from "@/components/ui/CurrencySwitcher";

const NAV_LINKS = [
  { label: "Hospitals", href: "/hospitals" },
  { label: "Packages", href: "/packages" },
  { label: "Treatments", href: "/treatments" },
  { label: "Visa Help", href: "/visa-help" },
  { label: "Blog", href: "/blog" },
];

export function Navbar({ patientName }: { patientName?: string | null }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
            <Heart size={18} />
          </span>
          <span className="text-lg font-semibold text-darktext">
            CARE<span className="text-primary">LET</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-darktext hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <button className="text-sm font-medium text-muted hover:text-primary">
            EN / AR
          </button>
          <CurrencySwitcher />
          {patientName ? (
            <Link href="/dashboard" className="text-sm font-medium text-darktext hover:text-primary">
              Hi, {patientName.split(" ")[0]}
            </Link>
          ) : (
            <Link href="/login" className="text-sm font-medium text-darktext hover:text-primary">
              Patient Login
            </Link>
          )}
          <LinkButton href="/contact" variant="secondary" size="sm">
            Get free quote
          </LinkButton>
        </div>

        <button
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
          className="text-darktext lg:hidden"
        >
          <Menu size={26} />
        </button>
      </div>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={NAV_LINKS}
        patientName={patientName}
      />
    </header>
  );
}
