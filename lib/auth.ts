import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { prisma, SAFE_HOSPITAL_SELECT, SAFE_DOCTOR_SELECT } from "@/lib/db";

const PATIENT_COOKIE = "patient_session";
const ADMIN_COOKIE = "admin_session";
const HOSPITAL_COOKIE = "hospital_session";
const DOCTOR_COOKIE = "doctor_session";
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

async function createRoleSession(cookieName: string, payload: Record<string, unknown>) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(getSecretKey());

  cookies().set(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION,
    path: "/",
  });
}

function clearRoleSession(cookieName: string) {
  cookies().delete(cookieName);
}

async function getRoleSessionPayload(cookieName: string) {
  const token = cookies().get(cookieName)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload;
  } catch {
    return null;
  }
}

// ---------- Patient ----------

export async function createPatientSession(patientId: string) {
  return createRoleSession(PATIENT_COOKIE, { patientId });
}

export async function clearPatientSession() {
  clearRoleSession(PATIENT_COOKIE);
}

export async function getCurrentPatient() {
  const payload = await getRoleSessionPayload(PATIENT_COOKIE);
  if (!payload) return null;
  return prisma.patient.findUnique({ where: { id: payload.patientId as string } });
}

// ---------- Admin ----------

export async function createAdminSession() {
  return createRoleSession(ADMIN_COOKIE, { role: "admin" });
}

export async function clearAdminSession() {
  clearRoleSession(ADMIN_COOKIE);
}

export async function isAdminAuthenticated() {
  const payload = await getRoleSessionPayload(ADMIN_COOKIE);
  return payload?.role === "admin";
}

// ---------- Hospital ----------

export async function createHospitalSession(hospitalId: string) {
  return createRoleSession(HOSPITAL_COOKIE, { hospitalId });
}

export async function clearHospitalSession() {
  clearRoleSession(HOSPITAL_COOKIE);
}

export async function getCurrentHospital() {
  const payload = await getRoleSessionPayload(HOSPITAL_COOKIE);
  if (!payload) return null;
  return prisma.hospital.findUnique({
    where: { id: payload.hospitalId as string },
    select: SAFE_HOSPITAL_SELECT,
  });
}

// ---------- Doctor ----------

export async function createDoctorSession(doctorId: string) {
  return createRoleSession(DOCTOR_COOKIE, { doctorId });
}

export async function clearDoctorSession() {
  clearRoleSession(DOCTOR_COOKIE);
}

export async function getCurrentDoctor() {
  const payload = await getRoleSessionPayload(DOCTOR_COOKIE);
  if (!payload) return null;
  return prisma.doctor.findUnique({
    where: { id: payload.doctorId as string },
    select: SAFE_DOCTOR_SELECT,
  });
}
