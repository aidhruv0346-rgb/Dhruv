import { NextRequest } from "next/server";

const encoder = new TextEncoder();
const cookieName = "admin_token";

function base64UrlEncode(input: ArrayBuffer | string) {
  const bytes = typeof input === "string" ? encoder.encode(input) : new Uint8Array(input);
  let binary = "";
  bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(input: string) {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(input.length / 4) * 4, "=");
  return atob(padded);
}

async function importKey(secret: string) {
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

function getSecret() {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) throw new Error("ADMIN_JWT_SECRET is not configured");
  return secret;
}

export async function signAdminToken(days: number) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64UrlEncode(JSON.stringify({ role: "admin", iat: now, exp: now + days * 24 * 60 * 60 }));
  const data = `${header}.${payload}`;
  const signature = await crypto.subtle.sign("HMAC", await importKey(getSecret()), encoder.encode(data));
  return `${data}.${base64UrlEncode(signature)}`;
}

export async function verifyAdminToken(token?: string) {
  if (!token) return false;
  if (!process.env.ADMIN_JWT_SECRET) return false;
  const [header, payload, signature] = token.split(".");
  if (!header || !payload || !signature) return false;

  const data = `${header}.${payload}`;
  const expected = await crypto.subtle.sign("HMAC", await importKey(getSecret()), encoder.encode(data));
  if (base64UrlEncode(expected) !== signature) return false;

  try {
    const parsed = JSON.parse(base64UrlDecode(payload));
    return parsed.role === "admin" && typeof parsed.exp === "number" && parsed.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export async function isAdminRequest(request: NextRequest) {
  return verifyAdminToken(request.cookies.get(cookieName)?.value);
}

export { cookieName };
