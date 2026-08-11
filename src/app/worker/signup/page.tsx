import Link from "next/link";

import { WorkerAuthShell } from "@/components/worker/WorkerAuthShell";

const basicFields = [
  { id: "worker-name", label: "이름", type: "text", placeholder: "예: 김민수" },
  { id: "worker-phone", label: "전화번호", type: "tel", placeholder: "예: 010-1234-5678" },
  { id: "worker-email", label: "이메일", type: "email", placeholder: "예: worker@example.com" },
  { id: "worker-password", label: "비밀번호", type: "password", placeholder: "비밀번호 입력" }
];

const preferenceFields = [
  { id: "preferred-region", label: "선호 지역", placeholder: "예: 경기 수원, 평택" },
  { id: "preferred-job", label: "선호 직종", placeholder: "예: 보통인부, 철근, 전기 보조" },
  { id: "preferred-pay", label: "선호 지급 조건", placeholder: "예: 당일 지급, 주급" }
];

const referralFields = [
  { id: "referrer-name", label: "소개자 이름", type: "text", placeholder: "예: 박현장" },
  { id: "referrer-phone", label: "소개자 전화번호", type: "tel", placeholder: "예: 010-0000-0000" }
];

function TextField({
  id,
  label,
  type = "text",
  placeholder
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold text-[#071B3A]">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="mt-2 min-h-12 w-full rounded-md border border-blue-100 bg-white px-4 text-sm text-[#071B3A] outline-none placeholder:text-slate-400"
      />
    </div>
  );
}

export default function WorkerSignupPage() {
  return (
    <WorkerAuthShell
      eyebrow="근로자 회원가입"
      title="건설 일자리 확인을 위한 근로자 가입"
      description="가입할 때 받을 기본 정보와 일자리 선호 조건을 미리 확인하는 화면입니다."
      notice="현재 화면은 회원가입 UI 1차 구현 단계입니다. 실제 가입과 저장 기능은 다음 단계에서 연결됩니다."
    >
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-6">
          <div>
            <p className="text-sm font-bold text-blue-700">입력 정보 미리보기</p>
            <h2 className="mt-2 text-2xl font-bold text-[#071B3A]">근로자 가입 정보</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              입력한 정보는 아직 저장되지 않습니다. 화면 구조를 먼저 확인하는 단계입니다.
            </p>
          </div>

          <div className="mt-6 space-y-7">
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
                  <TextField key={field.id} id={field.id} label={field.label} placeholder={field.placeholder} />
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
          </div>

          <div className="mt-7">
            <button
              type="button"
              className="min-h-12 w-full rounded-md bg-[#0B1F3A] px-5 text-sm font-bold text-white sm:w-auto"
            >
              가입 정보 입력 완료
            </button>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              실제 회원가입과 저장 기능은 다음 단계에서 연결될 예정입니다.
            </p>
          </div>
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
