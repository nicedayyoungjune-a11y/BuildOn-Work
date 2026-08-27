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
    placeholder: "선택 입력",
    required: false,
    helper: "이메일은 선택 항목입니다. 담당자 연락은 전화번호를 우선 사용합니다."
  }
];

const preferenceFields = [
  {
    id: "preferred-region",
    name: "preferred_regions",
    label: "선호 지역",
    placeholder: "예: 수원, 남양주, 대전 유성구",
    required: true,
    helper: "예: 수원, 남양주, 대전 유성구처럼 자유롭게 입력할 수 있습니다. 여러 개는 쉼표로 구분해 주세요."
  },
  {
    id: "preferred-job",
    name: "preferred_job_categories",
    label: "선호 직종",
    placeholder: "예: 철근, 미장, 전기 보조",
    required: true,
    helper: "예: 철근, 미장, 전기 보조처럼 자유롭게 입력할 수 있습니다. 여러 개는 쉼표로 구분해 주세요."
  },
  {
    id: "preferred-pay",
    name: "preferred_payment_options",
    label: "선호 지급 조건",
    placeholder: "예: 당일지급, 주급",
    required: false,
    helper: "선택 항목입니다. 원하는 조건이 있으면 자유롭게 입력해 주세요."
  }
];

const referralFields = [
  { id: "referrer-name", name: "referral_name", label: "소개자 이름", type: "text", placeholder: "선택 입력" },
  {
    id: "referrer-phone",
    name: "referral_phone",
    label: "소개자 전화번호",
    type: "tel",
    placeholder: "선택 입력"
  }
];

const errorMessages: Record<string, string> = {
  missing_required: "필수 입력 항목을 확인해 주세요.",
  submit_failed: "신청 접수 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요."
};

const successMessages: Record<string, string> = {
  received: "가입 신청이 접수되었습니다. 담당자가 확인 후 연락드리겠습니다."
};

function TextField({
  id,
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  helper
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  helper?: string;
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
      {helper ? <p className="mt-2 text-xs leading-5 text-slate-500">{helper}</p> : null}
    </div>
  );
}

type WorkerSignupPageProps = {
  searchParams: Promise<{
    error?: string;
    success?: string;
  }>;
};

export default async function WorkerSignupPage({ searchParams }: WorkerSignupPageProps) {
  const { error, success } = await searchParams;
  const errorMessage = error ? errorMessages[error] : undefined;
  const successMessage = success ? successMessages[success] : undefined;

  return (
    <WorkerAuthShell
      eyebrow="근로자 가입 신청"
      title="원하는 현장 조건을 남겨주세요"
      description="정식 로그인은 MVP 이후 안정화 과제로 두고, 지금은 담당자가 확인할 수 있는 가입 신청을 먼저 접수합니다."
      notice="전화번호를 중심으로 연락드리며, 선호 지역과 직종은 자유롭게 입력할 수 있습니다."
    >
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-6">
          <div>
            <p className="text-sm font-bold text-blue-700">신청 정보 입력</p>
            <h2 className="mt-2 text-2xl font-bold text-[#071B3A]">근로자 가입 신청</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              이름, 전화번호, 선호 지역과 직종만 있으면 먼저 신청할 수 있습니다.
            </p>
          </div>

          {successMessage ? (
            <p className="mt-5 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold leading-6 text-emerald-700">
              {successMessage}
            </p>
          ) : null}

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
                소개자가 있다면 입력해 주세요. 소개자 정보는 신청 경로 확인 목적으로만 사용합니다.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {referralFields.map((field) => (
                  <TextField key={field.id} {...field} />
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-base font-bold text-[#071B3A]">4. 추가 메모</h3>
              <label htmlFor="worker-note" className="sr-only">
                추가 메모
              </label>
              <textarea
                id="worker-note"
                name="note"
                rows={4}
                placeholder="희망 근무일, 이동 가능 거리, 자격증 등 전달할 내용이 있으면 적어주세요."
                className="mt-3 w-full rounded-md border border-blue-100 bg-white px-4 py-3 text-sm leading-6 text-[#071B3A] outline-none placeholder:text-slate-400"
              />
            </section>

            <button
              type="submit"
              className="min-h-12 w-full rounded-md bg-[#0B1F3A] px-5 text-sm font-bold text-white sm:w-auto"
            >
              가입 신청 접수하기
            </button>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              신청 후 담당자가 확인하여 가능한 일자리 안내를 위해 연락드립니다.
            </p>
          </form>
        </section>

        <aside className="space-y-4">
          <section className="rounded-xl border border-blue-100 bg-white p-5 shadow-lg shadow-blue-950/5">
            <h2 className="text-xl font-bold text-[#071B3A]">먼저 일자리를 둘러보세요</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              가입 신청 전에도 현재 준비 중인 현장과 직종 흐름을 확인할 수 있습니다.
            </p>
            <Link
              href="/worker/jobs"
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-blue-700 px-4 text-sm font-bold text-white transition-colors hover:bg-blue-800"
            >
              일자리 화면 보기
            </Link>
          </section>

          <section className="rounded-xl border border-blue-100 bg-[#071B3A] p-5 text-white shadow-lg shadow-blue-950/10">
            <h2 className="text-xl font-bold">MVP 운영 방식</h2>
            <p className="mt-3 text-sm leading-6 text-blue-100">
              지금은 로그인 계정을 바로 만들지 않고, 신청 정보를 접수한 뒤 담당자가 확인하는 방식으로 운영합니다.
            </p>
          </section>
        </aside>
      </div>
    </WorkerAuthShell>
  );
}
