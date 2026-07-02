import { NextResponse } from "next/server";
import { clearDoctorSession } from "@/lib/auth";

export async function POST() {
  await clearDoctorSession();
  return NextResponse.json({ success: true });
}
