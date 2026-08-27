"use server";

import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";

type SignupRequestErrorCode = "missing_required" | "submit_failed";

type SafeSubmitError = {
  code?: unknown;
  status?: unknown;
  name?: unknown;
};

function getText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getList(formData: FormData, key: string) {
  return getText(formData, key)
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

function failWith(error: SignupRequestErrorCode): never {
  redirect(`/worker/signup?error=${error}`);
}

function logSubmitFailure(step: string, error: SafeSubmitError) {
  console.error("worker signup request failed", {
    step,
    code: typeof error.code === "string" ? error.code : undefined,
    status: typeof error.status === "number" ? error.status : undefined,
    name: typeof error.name === "string" ? error.name : undefined
  });
}

export async function signupWorkerAction(formData: FormData) {
  const name = getText(formData, "name");
  const phone = getText(formData, "phone");
  const email = getText(formData, "email");
  const preferredRegions = getList(formData, "preferred_regions");
  const preferredJobCategories = getList(formData, "preferred_job_categories");
  const preferredPaymentOptions = getList(formData, "preferred_payment_options");
  const referralName = getText(formData, "referral_name");
  const referralPhone = getText(formData, "referral_phone");
  const note = getText(formData, "note");

  if (!name || !phone || preferredRegions.length === 0 || preferredJobCategories.length === 0) {
    failWith("missing_required");
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("worker_signup_requests").insert({
    name,
    phone,
    email: email || null,
    preferred_regions: preferredRegions,
    preferred_job_categories: preferredJobCategories,
    preferred_payment_options: preferredPaymentOptions,
    referral_name: referralName || null,
    referral_phone: referralPhone || null,
    note: note || null
  });

  if (error) {
    logSubmitFailure("worker_signup_request_insert", error);
    failWith("submit_failed");
  }

  redirect("/worker/signup?success=received");
}
