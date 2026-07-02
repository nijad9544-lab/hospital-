"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { SearchBar } from "@/components/ui/SearchBar";
import { LinkButton } from "@/components/ui/Button";
import { SITE_TAGLINE } from "@/lib/seo";

const STATS = [
  { value: "140+", label: "Hospitals" },
  { value: "60+", label: "Specialities" },
  { value: "30+", label: "Countries" },
];

const SLIDES = [
  {
    image: "/images/hero/backwaters.jpg",
    alt: "Traditional houseboat on Kerala backwaters at golden hour",
    headline: "World-class healthcare, the Kerala way",
    subtext:
      "Connect with NABH & JCI accredited hospitals, expert doctors, and authentic Ayurveda wellness programs — all in one trusted Kerala medical tourism portal.",
    cta: { label: "Plan Your Journey", href: "/contact" },
  },
  {
    image: "/images/hero/hospital-team.jpg",
    alt: "Team of doctors outside a modern Kerala hospital",
    headline: "Your end-to-end medical travel partner",
    subtext:
      "From hospital selection to visa support, our care coordinators guide you through every step of your treatment journey in Kerala.",
    cta: { label: "Explore Medical Packages", href: "/packages" },
  },
  {
    image: "/images/hero/ayurveda-resort.jpg",
    alt: "Ayurveda wellness resort amid Munnar tea plantations",
    headline: "A healing paradise for mind and body",
    subtext:
      "Discover authentic Panchakarma and Ayurveda wellness programs in the birthplace of traditional Indian healing.",
    cta: { label: "Discover Wellness Programs", href: "/ayurveda" },
  },
];

export function HeroSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[active];

  return (
    <section className="relative isolate flex min-h-[640px] items-center overflow-hidden sm:min-h-[720px]">
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={slide.image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-darktext/70 via-darktext/55 to-darktext/80" />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-pill bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
          <ShieldCheck size={16} className="text-secondary" />
          Trusted by 5,000+ International Patients
        </span>
        <p className="mt-3 text-sm font-medium uppercase tracking-wide text-secondary">
          {SITE_TAGLINE}
        </p>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slide.headline}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {slide.headline}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-white/85">
              {slide.subtext}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <LinkButton href={slide.cta.href} variant="secondary" size="lg">
            {slide.cta.label}
          </LinkButton>
          <LinkButton href="/packages" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-darktext">
            View Packages
          </LinkButton>
        </div>

        <div className="mt-10 flex justify-center">
          <SearchBar />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-pill bg-white/15 px-6 py-3 backdrop-blur">
              <span className="text-xl font-semibold text-secondary">{stat.value}</span>{" "}
              <span className="text-sm text-white/90">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-pill transition-all ${
                i === active ? "w-8 bg-secondary" : "w-4 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
