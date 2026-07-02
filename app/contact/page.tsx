import { Metadata } from "next";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { JsonLd } from "@/components/seo/PageSEO";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with CARELET's care coordinators for treatment quotes, hospital bookings and travel assistance.",
  keywords: ["contact Kerala medical tourism", "Kerala health enquiry"],
  path: "/contact",
});

const OFFICES = [
  {
    label: "Kochi Office",
    lines: [
      "VS-11, Beyond Co-working 90 A",
      "(Door No. 551171), Canal Road,",
      "Girinagar, Kadavanthara,",
      "Ernakulam, Kerala 682020",
    ],
    addressLocality: "Ernakulam",
    addressRegion: "Kerala",
    postalCode: "682020",
    streetAddress: "VS-11, Beyond Co-working 90 A (Door No. 551171), Canal Road, Girinagar, Kadavanthara",
  },
  {
    label: "Calicut Branch",
    lines: [
      "3rd Floor, Tower 2, HiLITE Business Park,",
      "Poovangal, Kozhikode,",
      "Pantheeramkavu, Kerala 673014",
    ],
    addressLocality: "Kozhikode",
    addressRegion: "Kerala",
    postalCode: "673014",
    streetAddress: "3rd Floor, Tower 2, HiLITE Business Park, Poovangal, Pantheeramkavu",
  },
];

const PHONE = "+91-7561 080156";
const EMAIL = "contact@carelet.in";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {OFFICES.map((office) => (
        <JsonLd
          key={office.label}
          data={{
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: `CARELET - ${office.label}`,
            url: `${SITE_URL}/contact`,
            address: {
              "@type": "PostalAddress",
              streetAddress: office.streetAddress,
              addressLocality: office.addressLocality,
              addressRegion: office.addressRegion,
              postalCode: office.postalCode,
              addressCountry: "IN",
            },
            telephone: PHONE,
            email: EMAIL,
          }}
        />
      ))}

      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
      <h1 className="mt-4 text-3xl font-semibold text-darktext">Contact Us</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Send us your treatment requirements and our care coordinators will respond
        within 24 hours with a personalised quote.
      </p>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <div className="flex-1 space-y-6">
          {OFFICES.map((office) => (
            <div key={office.label} className="rounded-card bg-white p-6 shadow-soft">
              <h2 className="text-lg font-semibold text-darktext">{office.label}</h2>
              <p className="mt-2 text-sm text-muted">
                {office.lines.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          ))}
          <div className="rounded-card bg-white p-6 shadow-soft">
            <p className="text-sm text-muted">{PHONE}</p>
            <p className="text-sm text-muted">{EMAIL}</p>
          </div>
        </div>
        <div className="w-full lg:w-96">
          <EnquiryForm title="Send an Enquiry" />
        </div>
      </div>
    </div>
  );
}
