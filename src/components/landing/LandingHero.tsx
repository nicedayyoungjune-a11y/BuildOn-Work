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

const audienceCards = [
  {
    title: "건설 일자리를 찾는 근로자라면",
    description: "가까운 현장, 직종, 일당, 근무일을 먼저 확인하세요.",
    href: "/worker/jobs",
    cta: "일자리 화면 보기",
    highlighted: false
  },
  {
    title: "현장 인력이 필요한 현장소장이라면",
    description: "필요 인원, 지원자, 출근 예정자를 한 화면에서 확인하세요.",
    href: "/company/dashboard",
    cta: "현장관리 화면 보기",
    highlighted: true
  }
];

export function LandingHero() {
  return (
    <section
      id="service"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#F8FBFF_0%,#FFFFFF_45%,#EEF5FF_100%)]"
    >
      <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="relative mx-auto grid min-h-[680px] max-w-6xl items-center gap-10 px-5 py-10 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
        <div>
          <p className="inline-flex rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-bold text-blue-800 shadow-sm">
            경기·충청권 건설 일자리 준비 중
          </p>
          <h1 className="mt-5 break-keep text-[2rem] font-bold leading-tight tracking-normal text-[#071B3A] sm:text-5xl lg:text-6xl">
            건설 현장 인력,
            <span className="block text-blue-700">이제 전화로 찾지 마세요.</span>
          </h1>
          <p className="mt-5 max-w-xl break-keep text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
            근로자는 가까운 현장을 찾고,
            <br className="sm:hidden" />
            현장소장은 필요한 인원과 출근 현황을 확인할 수 있도록 구성했습니다.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {audienceCards.map((card) => (
              <div
                key={card.href}
                className={`rounded-2xl border p-4 shadow-lg shadow-blue-950/5 ${
                  card.highlighted
                    ? "border-blue-700 bg-[#071B3A] text-white"
                    : "border-blue-100 bg-white text-[#071B3A]"
                }`}
              >
                <h2 className="break-keep text-lg font-bold leading-7">{card.title}</h2>
                <p
                  className={`mt-3 break-keep text-sm leading-6 ${
                    card.highlighted ? "text-blue-100" : "text-slate-600"
                  }`}
                >
                  {card.description}
                </p>
                <Link
                  href={card.href}
                  className={`mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-md px-4 text-sm font-bold transition-colors ${
                    card.highlighted
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-[#0B1F3A] text-white hover:bg-[#12315C]"
                  }`}
                >
                  {card.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden rounded-2xl border border-blue-100 bg-white/90 p-4 shadow-2xl shadow-blue-950/10 backdrop-blur sm:p-5 lg:block">
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
            인력 관리를 간편하게 연결하는 방향으로 준비하고 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
