import { mkdir, writeFile, readFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const UPLOAD_ROOT = path.join(process.cwd(), "uploads", "reports");

export const ALLOWED_MIME_TYPES = ["application/pdf", "image/jpeg", "image/png"];
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function saveReportFile(quoteRequestId: string, file: File) {
  const dir = path.join(UPLOAD_ROOT, quoteRequestId);
  await mkdir(dir, { recursive: true });

  const ext = path.extname(file.name) || "";
  const storedName = `${randomUUID()}${ext}`;
  const storedPath = path.join(quoteRequestId, storedName);
  const fullPath = path.join(UPLOAD_ROOT, storedPath);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(fullPath, buffer);

  return storedPath;
}

export async function readReportFile(storedPath: string) {
  const fullPath = path.join(UPLOAD_ROOT, storedPath);
  return readFile(fullPath);
}
