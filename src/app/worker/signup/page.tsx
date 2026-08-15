import Link from "next/link";

import { WorkerAuthShell } from "@/components/worker/WorkerAuthShell";

import { signupWorkerAction } from "./actions";

const basicFields = [
  { id: "worker-name", name: "name", label: "이름", type: "text", placeholder: "예: 김민수", required: true },
  {
    id: "worker-phone",
    name: "phone",
    label: "전화번호",
    type: "tel",
    placeholder: "예: 010-1234-5678",
    required: true
  },
  {
    id: "worker-email",
    name: "email",
    label: "이메일",
    type: "email",
    placeholder: "예: worker@example.com",
    required: true
  },
  {
    id: "worker-password",
    name: "password",
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호 입력",
    required: true
  }
];

const preferenceFields = [
  {
    id: "preferred-region",
    name: "preferred_regions",
    label: "선호 지역",
    placeholder: "예: 경기 수원, 평택",
    required: true
  },
  {
    id: "preferred-job",
    name: "preferred_job_categories",
    label: "선호 직종",
    placeholder: "예: 보통인부, 철근, 전기 보조",
    required: true
  },
  {
    id: "preferred-pay",
    name: "preferred_payment_options",
    label: "선호 지급 조건",
    placeholder: "예: 당일 지급, 주급",
    required: true
  }
];

const referralFields = [
  { id: "referrer-name", name: "referral_name", label: "소개자 이름", type: "text", placeholder: "예: 박현장" },
  {
    id: "referrer-phone",
    name: "referral_phone",
    label: "소개자 전화번호",
    type: "tel",
    placeholder: "예: 010-0000-0000"
  }
];

const errorMessages: Record<string, string> = {
  missing_required: "필수 정보를 입력해 주세요.",
  invalid_email: "이메일 형식을 확인해 주세요.",
  weak_password: "비밀번호는 최소 6자 이상 입력해 주세요.",
  auth_failed: "가입 계정 생성 중 문제가 발생했습니다.",
  auth_user_missing: "가입 계정 확인 중 문제가 발생했습니다.",
  signup_failed: "가입 처리 중 문제가 발생했습니다. 입력 정보를 확인하고 다시 시도해 주세요.",
  email_exists: "이미 가입된 이메일일 수 있습니다. 로그인 화면에서 다시 확인해 주세요."
};

function TextField({
  id,
  name,
  label,
  type = "text",
  placeholder,
  required = false
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold text-[#071B3A]">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-2 min-h-12 w-full rounded-md border border-blue-100 bg-white px-4 text-sm text-[#071B3A] outline-none placeholder:text-slate-400"
      />
    </div>
  );
}

type WorkerSignupPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function WorkerSignupPage({ searchParams }: WorkerSignupPageProps) {
  const { error } = await searchParams;
  const errorMessage = error ? errorMessages[error] : undefined;

  return (
    <WorkerAuthShell
      eyebrow="근로자 회원가입"
      title="건설 일자리 확인을 위한 근로자 가입"
      description="입력한 정보는 근로자 회원가입과 일자리 확인을 위해 사용합니다."
      notice="가입 완료 후 일자리 화면으로 이동합니다. 소개자 정보는 회원가입 경로 확인 및 소개 수당 검토 목적으로만 사용합니다."
    >
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-6">
          <div>
            <p className="text-sm font-bold text-blue-700">가입 정보 입력</p>
            <h2 className="mt-2 text-2xl font-bold text-[#071B3A]">근로자 가입 정보</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              선호 지역, 직종, 지급 조건은 쉼표로 구분해 여러 개 입력할 수 있습니다.
            </p>
          </div>

          {errorMessage ? (
            <p className="mt-5 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-700">
              {errorMessage}
            </p>
          ) : null}

          <form action={signupWorkerAction} className="mt-6 space-y-7">
            <section>
              <h3 className="text-base font-bold text-[#071B3A]">1. 기본 정보</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {basicFields.map((field) => (
                  <TextField key={field.id} {...field} />
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-base font-bold text-[#071B3A]">2. 일자리 선호 조건</h3>
              <div className="mt-4 grid gap-4">
                {preferenceFields.map((field) => (
                  <TextField key={field.id} {...field} />
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-base font-bold text-[#071B3A]">3. 소개자 정보</h3>
              <p className="mt-2 rounded-lg bg-blue-50 px-4 py-3 text-sm leading-6 text-slate-700">
                소개자가 있다면 입력해 주세요. 입력된 소개자 정보는 회원가입 경로 확인 및 소개
                수당 검토 목적으로만 사용됩니다.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {referralFields.map((field) => (
                  <TextField key={field.id} {...field} />
                ))}
              </div>
            </section>

            <button
              type="submit"
              className="min-h-12 w-full rounded-md bg-[#0B1F3A] px-5 text-sm font-bold text-white sm:w-auto"
            >
              가입 완료하고 일자리 보기
            </button>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              가입 완료 후 일자리 화면으로 이동합니다.
            </p>
          </form>
        </section>

        <aside className="space-y-4">
          <section className="rounded-xl border border-blue-100 bg-white p-5 shadow-lg shadow-blue-950/5">
            <h2 className="text-xl font-bold text-[#071B3A]">가입 후 확인할 화면</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              1차 연결 단계에서는 가입 후 일자리 목록으로 이동하는 흐름을 기준으로 준비합니다.
            </p>
            <Link
              href="/worker/jobs"
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-blue-700 px-4 text-sm font-bold text-white transition-colors hover:bg-blue-800"
            >
              일자리 먼저 보기
            </Link>
          </section>

          <section className="rounded-xl border border-blue-100 bg-[#071B3A] p-5 text-white shadow-lg shadow-blue-950/10">
            <h2 className="text-xl font-bold">이미 가입했다면</h2>
            <p className="mt-3 text-sm leading-6 text-blue-100">
              로그인 화면에서 어떤 정보를 입력하게 될지 미리 확인할 수 있습니다.
            </p>
            <Link
              href="/worker/login"
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-white px-4 text-sm font-bold text-[#071B3A] transition-colors hover:bg-blue-50"
            >
              로그인 화면으로 이동
            </Link>
          </section>
        </aside>
      </div>
    </WorkerAuthShell>
  );
}
