import { Phone, MessageCircle, Mail, ShieldCheck, Plane, Wifi, Users, HeartHandshake } from "lucide-react";
import { FaqAccordion } from "@/components/sections/FaqAccordion";

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || "+91XXXXXXXXXX";

const WHY_CHOOSE = [
  {
    icon: HeartHandshake,
    title: "Accessible care, every step",
    description: "From first enquiry to discharge, a dedicated coordinator manages your journey.",
  },
  {
    icon: Users,
    title: "Personalised treatment plans",
    description: "Care plans built around your diagnosis, language, and travel timeline.",
  },
  {
    icon: ShieldCheck,
    title: "Multi-disciplinary diagnostics",
    description: "Specialists collaborate on complex cases before a treatment plan is finalised.",
  },
  {
    icon: Plane,
    title: "Strict infection control",
    description: "Protocols aligned with ICMR and WHO guidelines across all patient areas.",
  },
];

const FAQS = [
  {
    q: "Do I need a visa to receive treatment in Kerala?",
    a: "Most international patients are eligible for India's e-Medical Visa. Our team helps prepare the hospital invitation letter and required documents once your treatment is confirmed.",
  },
  {
    q: "What documents should I bring for my first consultation?",
    a: "Bring your passport, any prior medical reports, scan/imaging discs, current medication list, and your visa documents.",
  },
  {
    q: "What payment options are accepted?",
    a: "Hospitals in our network accept cash, credit/debit cards, and wire transfer made in advance of admission. Ask your coordinator for the hospital's preferred method.",
  },
  {
    q: "Can I get a treatment cost estimate before travelling?",
    a: "Yes. Share your medical reports through our quote request system and you'll typically receive an estimate within 48 hours.",
  },
  {
    q: "Is accommodation provided for a travelling companion?",
    a: "Most hospital packages include complimentary stay for one attendant in the patient's room, with meals included. Additional companions can be booked at partner hotels nearby.",
  },
];

export function InternationalPatientsTab({
  phone,
  email,
}: {
  phone: string;
  email: string;
}) {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-xl font-semibold text-darktext">Communication & Support</h2>
        <p className="mt-2 text-muted">
          Multilingual coordinators are available to assist you before, during, and after
          your treatment.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <a href={`tel:${phone}`} className="flex items-center gap-3 rounded-card bg-offwhite p-4 hover:bg-primary/5">
            <Phone size={18} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-darktext">Appointment Helpline</p>
              <p className="text-sm text-muted">{phone}</p>
            </div>
          </a>
          <a
            href={`https://wa.me/${WA_NUMBER.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-card bg-offwhite p-4 hover:bg-primary/5"
          >
            <MessageCircle size={18} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-darktext">WhatsApp Support</p>
              <p className="text-sm text-muted">Chat with a coordinator</p>
            </div>
          </a>
          <a href={`mailto:${email}`} className="flex items-center gap-3 rounded-card bg-offwhite p-4 hover:bg-primary/5">
            <Mail size={18} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-darktext">Medical Queries</p>
              <p className="text-sm text-muted">{email}</p>
            </div>
          </a>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-darktext">Insurance & Payment</h2>
        <p className="mt-2 text-muted">
          We work with a network of international insurance providers and third-party
          administrators (TPAs) to support cashless treatment where applicable.
        </p>
        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <li className="rounded-btn bg-offwhite px-4 py-3 text-sm text-darktext">International insurance partners accepted</li>
          <li className="rounded-btn bg-offwhite px-4 py-3 text-sm text-darktext">Dedicated insurance help desk</li>
          <li className="rounded-btn bg-offwhite px-4 py-3 text-sm text-darktext">Cash, credit/debit card payments</li>
          <li className="rounded-btn bg-offwhite px-4 py-3 text-sm text-darktext">Advance wire transfer accepted</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-darktext">Travel & Accommodation</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-card bg-offwhite p-4">
            <Plane size={18} className="text-primary" />
            <p className="text-sm text-darktext">Complimentary airport pickup & drop</p>
          </div>
          <div className="flex items-center gap-3 rounded-card bg-offwhite p-4">
            <Wifi size={18} className="text-primary" />
            <p className="text-sm text-darktext">Local SIM card on arrival</p>
          </div>
          <div className="flex items-center gap-3 rounded-card bg-offwhite p-4">
            <ShieldCheck size={18} className="text-primary" />
            <p className="text-sm text-darktext">Visa & FRRO registration assistance</p>
          </div>
          <div className="flex items-center gap-3 rounded-card bg-offwhite p-4">
            <Users size={18} className="text-primary" />
            <p className="text-sm text-darktext">Partner hotels & service apartments nearby</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-darktext">Patient Amenities</h2>
        <p className="mt-2 text-muted">
          Complimentary stay for one attendant in the patient&apos;s room, with meals
          included, plus Wi-Fi and television in every room.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-darktext">Why Choose This Hospital</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {WHY_CHOOSE.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-card bg-offwhite p-4">
              <Icon size={20} className="text-primary" />
              <p className="mt-2 text-sm font-semibold text-darktext">{title}</p>
              <p className="mt-1 text-sm text-muted">{description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-darktext">Frequently Asked Questions</h2>
        <div className="mt-4">
          <FaqAccordion faqs={FAQS} />
        </div>
      </div>
    </div>
  );
}
