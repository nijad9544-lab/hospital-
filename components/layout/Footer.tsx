import Link from "next/link";
import { MessageCircle } from "lucide-react";

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || "+91XXXXXXXXXX";

function SocialGlyph({ label }: { label: string }) {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-xs font-semibold">
      {label}
    </span>
  );
}

export function Footer() {
  return (
    <footer className="bg-darktext text-offwhite">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">About</h3>
            <p className="text-sm text-offwhite/70">
              CARELET &mdash; Care Beyond Borders. We connect international patients with
              NABH and JCI accredited hospitals, expert doctors, and authentic Ayurveda
              wellness programs across Kerala, India.
            </p>
            <Link href="/about" className="mt-3 inline-block text-sm font-medium text-secondary hover:underline">
              Learn more about us &rarr;
            </Link>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm text-offwhite/70">
              <li><Link href="/hospitals" className="hover:text-secondary">Hospitals</Link></li>
              <li><Link href="/doctors" className="hover:text-secondary">Doctors</Link></li>
              <li><Link href="/packages" className="hover:text-secondary">Packages</Link></li>
              <li><Link href="/ayurveda" className="hover:text-secondary">Ayurveda</Link></li>
              <li><Link href="/visa-help" className="hover:text-secondary">Visa Help</Link></li>
              <li><Link href="/blog" className="hover:text-secondary">Blog</Link></li>
              <li><Link href="/partners/register" className="hover:text-secondary">Hospital Partners</Link></li>
              <li><Link href="/reviews/new" className="hover:text-secondary">Share Your Experience</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Treatments</h3>
            <ul className="space-y-2 text-sm text-offwhite/70">
              <li><Link href="/treatments/cardiac-bypass-surgery" className="hover:text-secondary">Cardiac Surgery</Link></li>
              <li><Link href="/treatments/knee-replacement-surgery" className="hover:text-secondary">Knee Replacement</Link></li>
              <li><Link href="/treatments/dental-implants" className="hover:text-secondary">Dental Implants</Link></li>
              <li><Link href="/treatments/ivf-treatment" className="hover:text-secondary">IVF Treatment</Link></li>
              <li><Link href="/treatments/panchakarma-detox" className="hover:text-secondary">Panchakarma Detox</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact</h3>
            <div className="space-y-3 text-sm text-offwhite/70">
              <div>
                <p className="font-medium text-offwhite">Kochi Office</p>
                <p>VS-11, Beyond Co-working 90 A (Door No. 551171),</p>
                <p>Canal Road, Girinagar, Kadavanthara,</p>
                <p>Ernakulam, Kerala 682020</p>
              </div>
              <div>
                <p className="font-medium text-offwhite">Calicut Branch</p>
                <p>3rd Floor, Tower 2, HiLITE Business Park,</p>
                <p>Poovangal, Pantheeramkavu,</p>
                <p>Kozhikode, Kerala 673014</p>
              </div>
              <p>+91-7561 080156</p>
              <p>contact@carelet.in</p>
            </div>
            <div className="mt-4 flex gap-3">
              <a href="https://facebook.com" aria-label="Facebook" className="hover:text-secondary"><SocialGlyph label="FB" /></a>
              <a href="https://instagram.com" aria-label="Instagram" className="hover:text-secondary"><SocialGlyph label="IG" /></a>
              <a href="https://youtube.com" aria-label="YouTube" className="hover:text-secondary"><SocialGlyph label="YT" /></a>
              <a href={`https://wa.me/${WA_NUMBER.replace(/[^0-9]/g, "")}`} aria-label="WhatsApp" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:text-secondary"><MessageCircle size={18} /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-sm text-offwhite/60 sm:px-6 lg:px-8">
        <p>
          © 2026 CARELET &middot;{" "}
          <Link href="/privacy" className="hover:text-secondary">Privacy</Link> &middot;{" "}
          <Link href="/terms" className="hover:text-secondary">Terms</Link> &middot;{" "}
          <Link href="/sitemap.xml" className="hover:text-secondary">Sitemap</Link>
        </p>
      </div>
    </footer>
  );
}
