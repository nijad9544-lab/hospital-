import { ShieldCheck, Languages, Plane, Clock } from "lucide-react";

const ITEMS = [
  {
    icon: ShieldCheck,
    label: "NABH/JCI Certified",
    description: "Internationally accredited hospital partners",
  },
  {
    icon: Languages,
    label: "Multilingual Support",
    description: "Coordinators fluent in English & Arabic",
  },
  {
    icon: Plane,
    label: "Visa Assistance",
    description: "End-to-end medical visa guidance",
  },
  {
    icon: Clock,
    label: "24/7 Care",
    description: "Round-the-clock patient support",
  },
];

export function TrustBar() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:grid-cols-4 sm:gap-6 sm:px-6 lg:px-8">
        {ITEMS.map(({ icon: Icon, label, description }) => (
          <div
            key={label}
            className="group flex flex-col items-center gap-3 rounded-card border border-primary/10 bg-offwhite p-6 text-center shadow-soft transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white transition-colors group-hover:bg-secondary group-hover:text-darktext">
              <Icon size={26} />
            </span>
            <span className="text-sm font-semibold text-darktext">{label}</span>
            <span className="text-xs text-muted">{description}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
