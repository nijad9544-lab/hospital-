import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/PageSEO";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/seo";
import { getCurrentPatient } from "@/lib/auth";
import { CurrencyProvider } from "@/components/providers/CurrencyProvider";
import { prisma } from "@/lib/db";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "CARELET connects international patients with NABH & JCI accredited hospitals, doctors, and Ayurveda wellness centers in Kerala, India.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [patient, approvedReviews] = await Promise.all([
    getCurrentPatient(),
    prisma.review.findMany({ where: { status: "approved" }, select: { rating: true } }),
  ]);

  const aggregateRating =
    approvedReviews.length > 0
      ? {
          "@type": "AggregateRating",
          ratingValue:
            Math.round(
              (approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length) * 10
            ) / 10,
          bestRating: "5",
          worstRating: "1",
          reviewCount: approvedReviews.length,
        }
      : undefined;

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-offwhite text-darktext`}>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
            logo: `${SITE_URL}/logo.jpg`,
            email: "contact@carelet.in",
            telephone: "+91-7561 080156",
            address: [
              {
                "@type": "PostalAddress",
                streetAddress:
                  "VS-11, Beyond Co-working 90 A (Door No. 551171), Canal Road, Girinagar, Kadavanthara",
                addressLocality: "Ernakulam",
                addressRegion: "Kerala",
                postalCode: "682020",
                addressCountry: "IN",
              },
              {
                "@type": "PostalAddress",
                streetAddress: "3rd Floor, Tower 2, HiLITE Business Park, Poovangal, Pantheeramkavu",
                addressLocality: "Kozhikode",
                addressRegion: "Kerala",
                postalCode: "673014",
                addressCountry: "IN",
              },
            ],
            ...(aggregateRating ? { aggregateRating } : {}),
          }}
        />
        <CurrencyProvider>
          <Navbar patientName={patient?.name} />
          <main>{children}</main>
          <Footer />
        </CurrencyProvider>
      </body>
    </html>
  );
}
