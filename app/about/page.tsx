import { Metadata } from "next";
import { ShieldCheck, HeartHandshake, Globe2, Stethoscope } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/PageSEO";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about CARELET's mission to connect international patients with trusted, accredited hospitals and Ayurveda wellness centers in Kerala, India.",
  path: "/about",
});

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Verified Partners Only",
    description:
      "Every hospital on CARELET is reviewed before approval, and holds recognised accreditation such as NABH or JCI.",
  },
  {
    icon: HeartHandshake,
    title: "Patient-First Coordination",
    description:
      "From your first enquiry to your flight home, a dedicated coordinator manages logistics so you can focus on your health.",
  },
  {
    icon: Globe2,
    title: "Built for International Patients",
    description:
      "We focus specifically on patients travelling from the Gulf, Africa, and beyond, with multilingual support and visa guidance.",
  },
  {
    icon: Stethoscope,
    title: "Medical Transparency",
    description:
      "Clear, upfront cost comparisons and treatment information, so you can make an informed decision before you travel.",
  },
];

const TEAM = [
  {
    role: "Founder & CEO",
    name: "[Add founder name]",
    bio: "[Add a short bio covering background in healthcare or medical tourism]",
  },
  {
    role: "Medical Director",
    name: "[Add medical director name]",
    bio: "[Add credentials, e.g. MD, years of clinical experience, specialisation]",
  },
  {
    role: "Head of Patient Care",
    name: "[Add team member name]",
    bio: "[Add background in patient coordination or international healthcare logistics]",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About CARELET",
        }}
      />

      <Breadcrumbs items={[{ name: "About", path: "/about" }]} />

      <h1 className="mt-4 text-3xl font-semibold text-darktext">About CARELET</h1>
      <p className="mt-3 max-w-2xl text-muted">
        CARELET connects international patients with accredited hospitals, vetted
        doctors, and authentic Ayurveda wellness centers across Kerala, India. Our
        mission is to make world-class, affordable healthcare accessible to patients
        from the Gulf, Africa, the UK, and beyond &mdash; without the guesswork.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-darktext">What We Stand For</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {VALUES.map(({ icon: Icon, title, description }) => (
          <div key={title} className="rounded-card bg-white p-5 shadow-soft">
            <Icon className="text-primary" size={24} />
            <h3 className="mt-3 text-sm font-semibold text-darktext">{title}</h3>
            <p className="mt-1 text-sm text-muted">{description}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-xl font-semibold text-darktext">Our Team</h2>
      <p className="mt-2 text-sm text-muted">
        [This section is a placeholder &mdash; replace with real team names, photos, and
        credentials before launch.]
      </p>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {TEAM.map((member) => (
          <div key={member.role} className="rounded-card bg-white p-5 shadow-soft">
            <div className="h-16 w-16 rounded-full bg-primary/10" />
            <p className="mt-3 text-sm font-semibold text-darktext">{member.name}</p>
            <p className="text-xs text-muted">{member.role}</p>
            <p className="mt-2 text-sm text-muted">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
