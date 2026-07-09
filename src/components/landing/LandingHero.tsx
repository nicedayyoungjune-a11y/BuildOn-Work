import Link from "next/link";

const requestItems = [
  { label: "보통인부", status: "지원자 확인" },
  { label: "철근 보조", status: "출근 예정" },
  { label: "전기 보조", status: "지급 조건 확인" }
];

const dashboardStats = [
  { label: "오늘 필요한 인원", value: "6명" },
  { label: "출근 현황", value: "4명" },
  { label: "지원자 확인", value: "2건" }
];

export function LandingHero() {
  return (
    <section id="service" className="relative overflow-hidden bg-[linear-gradient(135deg,#F8FBFF_0%,#FFFFFF_45%,#EEF5FF_100%)]">
      <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="relative mx-auto grid min-h-[680px] max-w-6xl items-center gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <p className="inline-flex rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-bold text-blue-800 shadow-sm">
            경기·충청권 건설 일자리 준비 중
          </p>
          <h1 className="mt-6 text-4xl font-bold tracking-normal text-[#071B3A] sm:text-5xl lg:text-6xl">
            건설 현장 인력, 이제{" "}
            <span className="text-blue-700">전화로 찾지 마세요.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
            오늘 필요한 건설 일용직부터 출근 현황까지 한 번에 관리하는
            건설인력 플랫폼.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            근로자는 가까운 현장을 찾고, 현장소장은 필요한 직종과 인원을
            쉽고 빠르게 요청할 수 있도록 준비하고 있습니다.
          </p>
          <div className="mt-6 grid gap-2 text-sm font-semibold text-[#0B1F3A] sm:grid-cols-3">
            <span className="rounded-md border border-blue-100 bg-white px-3 py-2 shadow-sm">
              건설 일자리
            </span>
            <span className="rounded-md border border-blue-100 bg-white px-3 py-2 shadow-sm">
              현장 인력 요청
            </span>
            <span className="rounded-md border border-blue-100 bg-white px-3 py-2 shadow-sm">
              출근 현황 확인
            </span>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/worker/jobs"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#0B1F3A] px-6 text-base font-bold text-white shadow-lg shadow-blue-950/20 transition-colors hover:bg-[#12315C]"
            >
              일자리 보기
            </Link>
            <Link
              href="/company/dashboard"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-blue-700 px-6 text-base font-bold text-white shadow-lg shadow-blue-700/20 transition-colors hover:bg-blue-800"
            >
              현장관리 보기
            </Link>
            <Link
              href="/admin/dashboard"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-blue-200 bg-white px-6 text-base font-bold text-blue-800 shadow-sm transition-colors hover:bg-blue-50"
            >
              관리자 화면 보기
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-white/90 p-4 shadow-2xl shadow-blue-950/10 backdrop-blur sm:p-5">
          <div className="rounded-xl border border-slate-100 bg-[#071B3A] p-5 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-blue-200">현장관리</p>
                <h2 className="mt-2 text-2xl font-bold">오늘 출근 현황</h2>
              </div>
              <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-100">
                화면 미리보기
              </span>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {dashboardStats.map((item) => (
                <div key={item.label} className="rounded-lg bg-white/10 p-3">
                  <p className="text-xs text-blue-100">{item.label}</p>
                  <p className="mt-2 text-lg font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {requestItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-3 rounded-xl border border-blue-100 bg-white p-4 shadow-sm"
              >
                <div>
                  <p className="font-bold text-[#071B3A]">{item.label}</p>
                  <p className="mt-1 text-sm text-slate-500">인력 요청 목록</p>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-xl bg-blue-50 px-4 py-3 text-sm leading-6 text-slate-700">
            실제 운영 수치가 아닌 화면 구성 미리보기입니다. 건설 일자리와 현장
            인력 요청을 더 간편하게 연결하는 방향으로 준비합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
