import { promises as fs } from "fs";
import path from "path";

export type ContactStatus = "New" | "Read" | "In Progress" | "Replied" | "Closed";
export type ContactPriority = "Low" | "Medium" | "High";

export type ContactRecord = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
  agreement: boolean;
  status: ContactStatus;
  priority: ContactPriority;
  starred: boolean;
  adminResponse?: {
    message: string;
    respondedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

const dataDir = path.join(process.cwd(), "data");
const contactsPath = path.join(dataDir, "contacts.json");

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf-8")) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(filePath: string, data: unknown) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

export async function getContactRecords() {
  const records = await readJson<ContactRecord[]>(contactsPath, []);
  return records.map(normalizeContact).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function saveContactRecords(records: ContactRecord[]) {
  await writeJson(contactsPath, records.map(normalizeContact));
}

export function makeContactId() {
  return `contact-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

export function normalizeContact(record: Partial<ContactRecord>): ContactRecord {
  const now = new Date().toISOString();
  return {
    id: String(record.id || makeContactId()),
    fullName: String(record.fullName || ""),
    email: String(record.email || ""),
    phone: String(record.phone || ""),
    service: String(record.service || ""),
    budget: String(record.budget || ""),
    message: String(record.message || ""),
    agreement: Boolean(record.agreement),
    status: ["New", "Read", "In Progress", "Replied", "Closed"].includes(String(record.status)) ? record.status as ContactStatus : "New",
    priority: ["Low", "Medium", "High"].includes(String(record.priority)) ? record.priority as ContactPriority : inferPriority(String(record.budget || ""), String(record.message || "")),
    starred: Boolean(record.starred),
    adminResponse: record.adminResponse,
    createdAt: String(record.createdAt || now),
    updatedAt: String(record.updatedAt || record.createdAt || now)
  };
}

export function inferPriority(budget: string, message: string): ContactPriority {
  if (/50|urgent|asap|immediate/i.test(`${budget} ${message}`)) return "High";
  if (/25|growth|website|ads|seo/i.test(`${budget} ${message}`)) return "Medium";
  return "Low";
}

export function contactsToCsv(records: ContactRecord[]) {
  const headers = ["Name", "Email", "Phone", "Service", "Budget", "Status", "Priority", "Starred", "Message", "Created At"];
  const rows = records.map((record) => [
    record.fullName,
    record.email,
    record.phone,
    record.service,
    record.budget,
    record.status,
    record.priority,
    record.starred ? "Yes" : "No",
    record.message,
    record.createdAt
  ]);
  return [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
}

function csvCell(value: string) {
  return `"${String(value || "").replace(/"/g, '""')}"`;
}
