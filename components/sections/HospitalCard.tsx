import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { StarRating } from "@/components/ui/StarRating";
import { LinkButton } from "@/components/ui/Button";
import { asStringArray } from "@/lib/types";

interface HospitalCardData {
  slug: string;
  name: string;
  city: string;
  accreditation: string;
  specialities: string;
  rating: number;
  reviewCount: number;
  imageUrl: string | null;
}

export function HospitalCard({ hospital }: { hospital: HospitalCardData }) {
  const accreditations = asStringArray(hospital.accreditation);
  const specialities = asStringArray(hospital.specialities).slice(0, 3);

  return (
    <Card>
      <div className="relative h-44 w-full bg-primary/10">
        {hospital.imageUrl && (
          <Image
            src={hospital.imageUrl}
            alt={`${hospital.name} in ${hospital.city}, Kerala`}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="space-y-3 p-5">
        <div className="flex flex-wrap gap-1.5">
          {accreditations.map((a) => (
            <Badge key={a} variant="primary">{a}</Badge>
          ))}
        </div>
        <h3 className="text-lg font-semibold text-darktext">{hospital.name}</h3>
        <p className="text-sm text-muted">{hospital.city}, Kerala</p>
        <div className="flex flex-wrap gap-1.5">
          {specialities.map((s) => (
            <Badge key={s} variant="outline">{s}</Badge>
          ))}
        </div>
        <StarRating rating={hospital.rating} reviewCount={hospital.reviewCount} />
        <div className="flex gap-2 pt-2">
          <LinkButton href={`/hospitals/${hospital.slug}`} variant="outline" size="sm" className="flex-1">
            View Profile
          </LinkButton>
          <LinkButton href="/contact" variant="primary" size="sm" className="flex-1">
            Book Consult
          </LinkButton>
        </div>
      </div>
    </Card>
  );
}
