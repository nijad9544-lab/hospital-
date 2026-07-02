"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { CurrencySwitcher } from "@/components/ui/CurrencySwitcher";

interface NavLink {
  label: string;
  href: string;
}

export function MobileMenu({
  open,
  onClose,
  links,
  patientName,
}: {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
  patientName?: string | null;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden"
        >
          <div className="flex items-center justify-between border-b border-primary/10 px-4 py-3">
            <span className="text-lg font-semibold text-darktext">
              CARE<span className="text-primary">LET</span>
            </span>
            <button aria-label="Close menu" onClick={onClose} className="text-darktext">
              <X size={26} />
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="rounded-btn px-3 py-3 text-base font-medium text-darktext hover:bg-offwhite hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="space-y-2 border-t border-primary/10 p-4">
            <div className="flex justify-center">
              <CurrencySwitcher />
            </div>
            <Link
              href={patientName ? "/dashboard" : "/login"}
              onClick={onClose}
              className="flex w-full items-center justify-center rounded-pill border border-primary/30 px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary/5"
            >
              {patientName ? `Hi, ${patientName.split(" ")[0]}` : "Patient Login"}
            </Link>
            <Link
              href="/contact"
              onClick={onClose}
              className="flex w-full items-center justify-center rounded-pill bg-secondary px-5 py-2.5 text-sm font-medium text-darktext hover:opacity-90"
            >
              Get free quote
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
