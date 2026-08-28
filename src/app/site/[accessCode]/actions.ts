"use server";

import { createHash, randomBytes } from "node:crypto";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";

const SITE_MANAGER_SESSION_COOKIE = "workerin_site_session";
const SITE_MANAGER_SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

type SiteManagerSessionResult = {
  success: boolean | null;
  site_id: string | null;
  site_name: string | null;
  company_name: string | null;
  session_expires_at: string | null;
  message: string | null;
};

type SafeSupabaseError = {
  code?: unknown;
  status?: unknown;
  name?: unknown;
};

function getTextValue(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function redirectToSiteAccess(accessCode: string, query: string): never {
  redirect(`/site/${encodeURIComponent(accessCode)}?${query}`);
}

function logVerificationError(step: string, error: SafeSupabaseError) {
  console.error("site manager PIN verification failed", {
    step,
    code: typeof error.code === "string" ? error.code : undefined,
    status: typeof error.status === "number" ? error.status : undefined,
    name: typeof error.name === "string" ? error.name : undefined
  });
}

function createSessionToken() {
  return randomBytes(32).toString("base64url");
}

function hashSessionToken(sessionToken: string) {
  return createHash("sha256").update(sessionToken).digest("hex");
}

function getSessionResult(data: SiteManagerSessionResult[] | SiteManagerSessionResult | null) {
  if (Array.isArray(data)) {
    return data[0] ?? null;
  }

  return data;
}

export async function verifySiteManagerPinAction(accessCode: string, formData: FormData) {
  const pin = getTextValue(formData, "pin");

  if (!pin) {
    redirectToSiteAccess(accessCode, "error=missing_pin");
  }

  const sessionToken = createSessionToken();
  const sessionTokenHash = hashSessionToken(sessionToken);
  const headerStore = await headers();
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.rpc("create_site_manager_session", {
    input_access_code: accessCode,
    input_pin: pin,
    input_session_token_hash: sessionTokenHash,
    input_user_agent: headerStore.get("user-agent") ?? "server-action"
  });

  if (error) {
    logVerificationError("create_site_manager_session_rpc", error);
    redirectToSiteAccess(accessCode, "error=invalid_pin");
  }

  const result = getSessionResult(data as SiteManagerSessionResult[] | SiteManagerSessionResult | null);

  if (!result?.success) {
    redirectToSiteAccess(accessCode, "error=invalid_pin");
  }

  const cookieStore = await cookies();

  cookieStore.set(SITE_MANAGER_SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: `/site/${encodeURIComponent(accessCode)}`,
    maxAge: SITE_MANAGER_SESSION_MAX_AGE_SECONDS
  });

  redirectToSiteAccess(accessCode, "verified=1");
}
