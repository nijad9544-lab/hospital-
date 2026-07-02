import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { FeaturedHospitals } from "@/components/sections/FeaturedHospitals";
import { PackageCards } from "@/components/sections/PackageCards";
import { WhyKerala } from "@/components/sections/WhyKerala";
import { TreatmentCosts } from "@/components/sections/TreatmentCosts";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { EnquiryBanner } from "@/components/sections/EnquiryBanner";

export const metadata: Metadata = buildMetadata({
  title: "World-Class Healthcare, the Kerala Way",
  description:
    "Find NABH & JCI accredited hospitals, expert doctors, and authentic Ayurveda wellness packages for affordable medical tourism in Kerala, India.",
  keywords: [
    "medical tourism Kerala",
    "Ayurveda packages Kerala",
    "best hospitals Kerala",
    "Kerala healthcare for international patients",
  ],
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <CategoryGrid />
      <FeaturedHospitals />
      <PackageCards />
      <WhyKerala />
      <TreatmentCosts />
      <TestimonialsSection />
      <EnquiryBanner />
    </>
  );
}
