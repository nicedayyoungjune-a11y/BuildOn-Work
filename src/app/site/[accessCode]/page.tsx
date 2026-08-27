import Link from "next/link";

import { verifySiteManagerPinAction } from "./actions";

type SiteAccessPageProps = {
  params: Promise<{
    accessCode: string;
  }>;
  searchParams: Promise<{
    error?: string;
    verified?: string;
    success?: string;
  }>;
};

const errorMessages: Record<string, string> = {
  invalid_pin: "접근 코드 또는 PIN을 확인해 주세요.",
  missing_pin: "PIN을 입력해 주세요."
};

export default async function SiteAccessPage({ params, searchParams }: SiteAccessPageProps) {
  const { accessCode } = await params;
  const { error, success, verified } = await searchParams;
  const verifyAction = verifySiteManagerPinAction.bind(null, accessCode);
  const errorMessage = error ? errorMessages[error] : undefined;
  const isVerified = verified === "1" || success === "verified";

  return (
    <main className="min-h-screen bg-[#F3F7FF] px-4 py-5 text-[#071B3A] sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-40px)] max-w-5xl flex-col">
        <header className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Link href="/" className="text-sm font-bold text-blue-700">
                BuildOn Work
              </Link>
              <p className="mt-4 inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800">
                현장관리자 전용
              </p>
              <h1 className="mt-4 break-keep text-2xl font-bold tracking-normal sm:text-4xl">
                현장 관리 접근
              </h1>
              <p className="mt-3 max-w-2xl break-keep text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                전달받은 PIN을 입력하면 해당 현장 관리 화면으로 이동합니다.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end">
              <Link
                href="/worker/jobs"
                className="inline-flex min-h-10 items-center justify-center rounded-md border border-blue-100 bg-blue-50 px-3 text-center text-xs font-bold text-blue-800 transition-colors hover:bg-blue-100 sm:px-4 sm:text-sm"
              >
                일자리 화면
              </Link>
              <Link
                href="/"
                className="inline-flex min-h-10 items-center justify-center rounded-md border border-blue-100 bg-white px-3 text-center text-xs font-bold text-blue-800 transition-colors hover:bg-blue-50 sm:px-4 sm:text-sm"
              >
                처음으로
              </Link>
            </div>
          </div>
        </header>

        <section className="grid flex-1 items-center gap-5 py-5 sm:py-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-xl border border-blue-100 bg-white p-5 shadow-lg shadow-blue-950/5 sm:p-7">
            <p className="text-sm font-bold text-blue-700">접근 코드</p>
            <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
              <p className="break-all font-mono text-lg font-bold text-[#071B3A]">{accessCode}</p>
            </div>

            {isVerified ? (
              <div className="mt-5 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold leading-6 text-emerald-800">
                PIN이 확인되었습니다. 다음 단계에서 현장 요약과 지원자 목록을 연결합니다.
              </div>
            ) : null}

            {errorMessage ? (
              <div className="mt-5 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold leading-6 text-red-700">
                {errorMessage}
              </div>
            ) : null}

            <form action={verifyAction} className="mt-6">
              <label htmlFor="site-pin" className="text-sm font-bold text-[#071B3A]">
                PIN 입력
              </label>
              <input
                id="site-pin"
                name="pin"
                type="password"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="전달받은 PIN을 입력하세요"
                className="mt-2 min-h-12 w-full rounded-md border border-blue-100 bg-white px-4 text-sm text-[#071B3A] outline-none placeholder:text-slate-400"
              />

              <button
                type="submit"
                className="mt-5 min-h-12 w-full rounded-md bg-[#0B1F3A] px-5 text-sm font-bold text-white"
              >
                현장 관리 화면 확인
              </button>
            </form>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              PIN 검증은 연결되었습니다. 현장 데이터 조회는 다음 단계에서 연결됩니다.
            </p>
          </div>

          <aside className="space-y-4">
            <section className="rounded-xl border border-blue-100 bg-white p-5 shadow-lg shadow-blue-950/5">
              <h2 className="text-xl font-bold text-[#071B3A]">현장관리자 전용 접근 화면</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                이 화면은 워커인 운영팀이 전달한 현장 전용 링크와 PIN을 받은 현장관리자를 위한
                접근 화면입니다.
              </p>
            </section>

            <section className="rounded-xl border border-blue-100 bg-[#071B3A] p-5 text-white shadow-lg shadow-blue-950/10">
              <h2 className="text-xl font-bold">MVP 보안 기준</h2>
              <p className="mt-3 text-sm leading-6 text-blue-100">
                민감정보, 정산, 계약 정보는 이 화면에서 다루지 않습니다. 현장별 지원자 확인과
                출근 관리 기능만 단계적으로 연결합니다.
              </p>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}
