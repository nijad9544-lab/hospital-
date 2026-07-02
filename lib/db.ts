import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Field selections that exclude passwordHash for any query whose result may be
// serialized to the client (JSON response, or a prop passed into a "use client" component).
export const SAFE_HOSPITAL_SELECT = {
  id: true,
  slug: true,
  name: true,
  city: true,
  state: true,
  accreditation: true,
  specialities: true,
  description: true,
  address: true,
  phone: true,
  email: true,
  website: true,
  rating: true,
  reviewCount: true,
  imageUrl: true,
  featured: true,
  status: true,
  createdAt: true,
} as const;

export const SAFE_DOCTOR_SELECT = {
  id: true,
  slug: true,
  name: true,
  title: true,
  speciality: true,
  qualification: true,
  experience: true,
  hospitalId: true,
  languages: true,
  imageUrl: true,
  bio: true,
  featured: true,
  email: true,
  status: true,
} as const;
