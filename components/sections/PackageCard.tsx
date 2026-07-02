import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";

interface PackageCardData {
  slug: string;
  name: string;
  category: string;
  duration: string;
  city: string;
  price: number;
  imageUrl: string | null;
}

export function PackageCard({ pkg }: { pkg: PackageCardData }) {
  return (
    <Card>
      <div className="relative h-44 w-full bg-primary/10">
        {pkg.imageUrl && (
          <Image
            src={pkg.imageUrl}
            alt={`${pkg.name} in ${pkg.city}, Kerala`}
            fill
            className="object-cover"
          />
        )}
        <Badge variant="secondary" className="absolute left-3 top-3 capitalize">
          {pkg.category}
        </Badge>
      </div>
      <div className="space-y-2 p-5">
        <h3 className="text-lg font-semibold text-darktext">{pkg.name}</h3>
        <p className="text-sm text-muted">
          {pkg.duration} &middot; {pkg.city}
        </p>
        <Price amountInINR={pkg.price} className="block text-xl font-semibold text-primary" />
        <LinkButton href={`/packages/${pkg.slug}`} variant="primary" size="sm" className="mt-2 w-full">
          View Package
        </LinkButton>
      </div>
    </Card>
  );
}
