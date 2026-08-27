"use server";

import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";

type SiteManagerPinResult = {
  success: boolean | null;
  site_id: string | null;
  site_name: string | null;
  company_name: string | null;
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

function getPinResult(data: SiteManagerPinResult[] | SiteManagerPinResult | null) {
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

  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.rpc("verify_site_manager_pin", {
    input_access_code: accessCode,
    input_pin: pin
  });

  if (error) {
    logVerificationError("verify_site_manager_pin_rpc", error);
    redirectToSiteAccess(accessCode, "error=invalid_pin");
  }

  const result = getPinResult(data as SiteManagerPinResult[] | SiteManagerPinResult | null);

  if (!result?.success) {
    redirectToSiteAccess(accessCode, "error=invalid_pin");
  }

  redirectToSiteAccess(accessCode, "verified=1");
}
