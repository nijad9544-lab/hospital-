import { Metadata } from "next";
import { ShieldCheck, FileText, PlaneTakeoff, Hotel } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { QuoteForm } from "@/components/forms/QuoteForm";

export const metadata: Metadata = buildMetadata({
  title: "Medical Visa & Travel Assistance for Kerala",
  description:
    "Step-by-step guidance on Indian medical visas, airport transfers, accommodation and travel logistics for patients visiting Kerala.",
  keywords: ["India medical visa", "Kerala travel assistance", "medical visa help"],
  path: "/visa-help",
});

const STEPS = [
  {
    icon: FileText,
    title: "Medical Visa (e-Medical Visa)",
    description:
      "Most international patients are eligible for India's e-Medical Visa, valid for up to 60 days with two extensions. We help you prepare the required hospital invitation letter and documents.",
  },
  {
    icon: PlaneTakeoff,
    title: "Airport Transfers",
    description:
      "All our partner hospitals arrange airport pickup and drop for patients and one accompanying attendant, included in most packages.",
  },
  {
    icon: Hotel,
    title: "Accommodation",
    description:
      "We help arrange accommodation near your hospital or wellness resort, ranging from budget guest houses to premium hotels.",
  },
  {
    icon: ShieldCheck,
    title: "On-Ground Support",
    description:
      "Dedicated multilingual patient coordinators assist with hospital admission, translation and day-to-day logistics throughout your stay.",
  },
];

export default function VisaHelpPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "Visa Help", path: "/visa-help" }]} />
      <h1 className="mt-4 text-3xl font-semibold text-darktext">
        Medical Visa & Travel Assistance for Kerala
      </h1>
      <p className="mt-2 max-w-2xl text-muted">
        Everything you need to know about visas, travel and accommodation when visiting
        Kerala for medical treatment.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {STEPS.map(({ icon: Icon, title, description }) => (
          <div key={title} className="rounded-card bg-white p-6 shadow-soft">
            <Icon className="text-primary" size={28} />
            <h2 className="mt-3 text-lg font-semibold text-darktext">{title}</h2>
            <p className="mt-2 text-sm text-muted">{description}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 max-w-md">
        <QuoteForm />
      </div>
    </div>
  );
}
