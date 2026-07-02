import Image from "next/image";
import Link from "next/link";
import { Leaf, HeartPulse, Bone, Smile, Microscope, Baby, Hand, Sparkles } from "lucide-react";

const CATEGORIES = [
  { label: "Ayurveda", icon: Leaf, href: "/ayurveda", image: "/images/categories/ayurveda.jpg" },
  { label: "Cardiac", icon: HeartPulse, href: "/treatments/cardiac-bypass-surgery", image: "/images/categories/cardiac.jpg" },
  { label: "Orthopaedics", icon: Bone, href: "/treatments/knee-replacement-surgery", image: "/images/categories/orthopaedics.jpg" },
  { label: "Dental", icon: Smile, href: "/treatments/dental-implants", image: "/images/categories/dental.jpg" },
  { label: "Oncology", icon: Microscope, href: "/treatments/cancer-treatment", image: "/images/categories/oncology.jpg" },
  { label: "Fertility/IVF", icon: Baby, href: "/treatments/ivf-treatment", image: "/images/categories/fertility.jpg" },
  { label: "Marma Therapy", icon: Hand, href: "/ayurveda", image: "/images/categories/marma-therapy.jpg" },
  { label: "Wellness", icon: Sparkles, href: "/ayurveda", image: "/images/categories/wellness.jpg" },
];

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-center text-3xl font-semibold text-darktext">
        Explore by Speciality
      </h2>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {CATEGORIES.map(({ label, icon: Icon, href, image }) => (
          <Link
            key={label}
            href={href}
            className="group relative aspect-square overflow-hidden rounded-card shadow-soft transition-transform hover:-translate-y-1"
          >
            <Image
              src={image}
              alt={`${label} treatment in Kerala`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-darktext/85 via-darktext/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-end gap-2 p-4 text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur">
                <Icon size={20} />
              </span>
              <span className="text-sm font-semibold text-white">{label}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
