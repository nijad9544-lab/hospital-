import { PiggyBank, BadgeCheck, Leaf, Languages } from "lucide-react";

const REASONS = [
  {
    icon: PiggyBank,
    title: "Cost savings up to 80%",
    description: "Get the same procedures and implants as Western hospitals at a fraction of the cost.",
  },
  {
    icon: BadgeCheck,
    title: "JCI accredited hospitals",
    description: "Internationally certified hospitals with the same quality standards followed globally.",
  },
  {
    icon: Leaf,
    title: "Ayurveda heritage",
    description: "Kerala is the birthplace of authentic Ayurveda, ideal for recovery and rejuvenation.",
  },
  {
    icon: Languages,
    title: "English-speaking doctors",
    description: "All specialists communicate fluently in English, with Arabic interpreters available.",
  },
];

export function WhyKerala() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-semibold text-darktext">
          Why Choose Kerala for Medical Treatment
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="text-center">
              <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon size={28} />
              </span>
              <h3 className="text-base font-semibold text-darktext">{title}</h3>
              <p className="mt-2 text-sm text-muted">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
