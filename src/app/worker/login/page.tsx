import Link from "next/link";

import { WorkerAuthShell } from "@/components/worker/WorkerAuthShell";

export default function WorkerLoginPage() {
  return (
    <WorkerAuthShell
      eyebrow="근로자 로그인"
      title="가입한 근로자 로그인"
      description="근로자가 로그인할 때 보게 될 입력 구조를 미리 확인하는 화면입니다."
      notice="현재 화면은 로그인 UI 1차 구현 단계입니다. 실제 로그인 기능은 다음 단계에서 연결됩니다."
    >
      <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="space-y-4 lg:order-1">
          <section className="rounded-xl border border-blue-100 bg-white p-5 shadow-lg shadow-blue-950/5">
            <h2 className="text-xl font-bold text-[#071B3A]">로그인 후 이동 예정</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              1차 연결 단계에서는 로그인 후 일자리 목록으로 이동하는 흐름을 기준으로 준비합니다.
            </p>
            <Link
              href="/worker/jobs"
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-blue-700 px-4 text-sm font-bold text-white transition-colors hover:bg-blue-800"
            >
              일자리 먼저 보기
            </Link>
          </section>

          <section className="rounded-xl border border-blue-100 bg-[#071B3A] p-5 text-white shadow-lg shadow-blue-950/10">
            <h2 className="text-xl font-bold">아직 가입하지 않았다면</h2>
            <p className="mt-3 text-sm leading-6 text-blue-100">
              근로자 회원가입 화면에서 필요한 기본 정보를 먼저 확인하세요.
            </p>
            <Link
              href="/worker/signup"
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-white px-4 text-sm font-bold text-[#071B3A] transition-colors hover:bg-blue-50"
            >
              근로자 회원가입
            </Link>
          </section>
        </aside>

        <section className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-6 lg:order-2">
          <div>
            <p className="text-sm font-bold text-blue-700">입력 정보 미리보기</p>
            <h2 className="mt-2 text-2xl font-bold text-[#071B3A]">로그인 정보</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              입력한 정보는 아직 확인되거나 저장되지 않습니다. 화면 구조를 먼저 확인하는 단계입니다.
            </p>
          </div>

          <div className="mt-6 grid gap-4">
            <div>
              <label htmlFor="login-id" className="text-sm font-bold text-[#071B3A]">
                이메일 또는 전화번호
              </label>
              <input
                id="login-id"
                name="login-id"
                type="text"
                placeholder="예: worker@example.com 또는 010-1234-5678"
                className="mt-2 min-h-12 w-full rounded-md border border-blue-100 bg-white px-4 text-sm text-[#071B3A] outline-none placeholder:text-slate-400"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="text-sm font-bold text-[#071B3A]">
                비밀번호
              </label>
              <input
                id="login-password"
                name="login-password"
                type="password"
                placeholder="비밀번호 입력"
                className="mt-2 min-h-12 w-full rounded-md border border-blue-100 bg-white px-4 text-sm text-[#071B3A] outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="mt-7">
            <button
              type="button"
              className="min-h-12 w-full rounded-md bg-[#0B1F3A] px-5 text-sm font-bold text-white sm:w-auto"
            >
              로그인 정보 입력 완료
            </button>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              실제 로그인 기능은 다음 단계에서 연결될 예정입니다.
            </p>
          </div>
        </section>
      </div>
    </WorkerAuthShell>
  );
}
