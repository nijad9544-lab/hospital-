import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface DoctorCardData {
  slug: string;
  name: string;
  title: string;
  speciality: string;
  qualification: string;
  experience: number;
  imageUrl: string | null;
  hospital?: { name: string; city: string } | null;
}

export function DoctorCard({ doctor }: { doctor: DoctorCardData }) {
  return (
    <Link href={`/doctors/${doctor.slug}`}>
      <Card className="h-full transition-transform hover:-translate-y-1">
        <div className="relative h-48 w-full bg-primary/10">
          {doctor.imageUrl && (
            <Image
              src={doctor.imageUrl}
              alt={`${doctor.title} ${doctor.name}, ${doctor.speciality} specialist in Kerala`}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="space-y-2 p-5">
          <Badge variant="primary">{doctor.speciality}</Badge>
          <h3 className="text-lg font-semibold text-darktext">
            {doctor.title} {doctor.name}
          </h3>
          <p className="text-sm text-muted">{doctor.qualification}</p>
          <p className="text-sm text-muted">{doctor.experience} years experience</p>
          {doctor.hospital && (
            <p className="text-sm text-primary">{doctor.hospital.name}, {doctor.hospital.city}</p>
          )}
        </div>
      </Card>
    </Link>
  );
}
