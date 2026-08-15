"use server";

import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";

type SignupErrorCode =
  | "missing_required"
  | "invalid_email"
  | "weak_password"
  | "auth_failed"
  | "auth_user_missing"
  | "profile_create_failed"
  | "signup_failed"
  | "email_exists";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

function failWith(error: SignupErrorCode): never {
  redirect(`/worker/signup?error=${error}`);
}

function getSafeErrorMeta(error: { code?: unknown; status?: unknown }) {
  return {
    code: typeof error.code === "string" ? error.code : undefined,
    status: typeof error.status === "number" ? error.status : undefined
  };
}

function logSignupFailure(step: string, error: { code?: unknown; status?: unknown }) {
  console.error("worker signup failed", {
    step,
    ...getSafeErrorMeta(error)
  });
}

function mapAuthError(error: { message?: unknown; code?: unknown; status?: unknown }): SignupErrorCode {
  const normalizedCode = typeof error.code === "string" ? error.code.toLowerCase() : "";
  const normalizedMessage = typeof error.message === "string" ? error.message.toLowerCase() : "";
  const status = typeof error.status === "number" ? error.status : undefined;

  if (
    normalizedCode.includes("email_exists") ||
    normalizedCode.includes("user_already_exists") ||
    normalizedMessage.includes("already registered") ||
    normalizedMessage.includes("already exists") ||
    normalizedMessage.includes("user already")
  ) {
    return "email_exists";
  }

  if (
    normalizedCode.includes("weak_password") ||
    (normalizedMessage.includes("password") &&
      (normalizedMessage.includes("weak") ||
        normalizedMessage.includes("least") ||
        normalizedMessage.includes("6")))
  ) {
    return "weak_password";
  }

  if (
    normalizedCode.includes("invalid_email") ||
    (normalizedMessage.includes("email") &&
      (normalizedMessage.includes("invalid") || normalizedMessage.includes("format")))
  ) {
    return "invalid_email";
  }

  if (
    normalizedMessage.includes("database") ||
    normalizedMessage.includes("saving new user") ||
    normalizedMessage.includes("trigger") ||
    (normalizedCode === "unexpected_failure" && status === 500)
  ) {
    return "profile_create_failed";
  }

  return "auth_failed";
}

export async function signupWorkerAction(formData: FormData) {
  const name = getText(formData, "name");
  const phone = getText(formData, "phone");
  const email = getText(formData, "email");
  const password = getText(formData, "password");
  const preferredRegions = getList(formData, "preferred_regions");
  const preferredJobCategories = getList(formData, "preferred_job_categories");
  const preferredPaymentOptions = getList(formData, "preferred_payment_options");
  const referralName = getText(formData, "referral_name");
  const referralPhone = getText(formData, "referral_phone");

  if (
    !name ||
    !phone ||
    !email ||
    !password ||
    preferredRegions.length === 0 ||
    preferredJobCategories.length === 0 ||
    preferredPaymentOptions.length === 0
  ) {
    failWith("missing_required");
  }

  if (!EMAIL_PATTERN.test(email)) {
    failWith("invalid_email");
  }

  if (password.length < 6) {
    failWith("weak_password");
  }

  const supabase = await createServerSupabaseClient();
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        phone,
        preferred_regions: preferredRegions,
        preferred_job_categories: preferredJobCategories,
        preferred_payment_options: preferredPaymentOptions,
        referral_name: referralName || undefined,
        referral_phone: referralPhone || undefined
      }
    }
  });

  if (authError) {
    logSignupFailure("auth_signup", authError);
    failWith(mapAuthError(authError));
  }

  const authUserId = authData.user?.id;

  if (!authUserId) {
    failWith("auth_user_missing");
  }

  redirect("/worker/jobs");
}
