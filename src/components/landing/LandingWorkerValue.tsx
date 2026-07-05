import { LandingSectionTitle } from "./LandingSectionTitle";

const workerValues = [
  {
    title: "가까운 현장 확인",
    description: "새벽에 무작정 기다리기보다 내 주변 건설 일자리를 먼저 확인합니다.",
    badge: "현장"
  },
  {
    title: "일당과 지급 조건 확인",
    description: "지원 전에 현장별 일당, 당일 지급, 주급 조건을 확인합니다.",
    badge: "일당"
  },
  {
    title: "지원한 일자리 확인",
    description: "내가 지원한 일자리와 진행 상태를 한눈에 볼 수 있게 준비합니다.",
    badge: "지원"
  },
  {
    title: "출근 확정 확인",
    description: "오늘 출근할 현장이 확정됐는지 쉽게 확인할 수 있게 합니다.",
    badge: "출근"
  }
];

export function LandingWorkerValue() {
  return (
    <section id="worker" className="bg-white px-5 py-18 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <LandingSectionTitle
          eyebrow="근로자 일자리 찾기"
          title="건설 일용직을 위한 쉬운 일자리 찾기."
          description="원하는 직종, 원하는 지역, 원하는 날짜에 맞는 현장을 더 간편하게 찾을 수 있도록 준비합니다."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-blue-100 bg-[#F8FBFF] p-5 shadow-xl shadow-blue-950/5">
            <div className="rounded-xl bg-[#071B3A] p-5 text-white">
              <p className="text-sm font-semibold text-blue-200">근로자 화면</p>
              <h3 className="mt-2 text-2xl font-bold">수원 아파트 보수 현장</h3>
              <div className="mt-5 space-y-3">
                {["보통인부", "근무일 확인", "일당 확인", "출근 확정 대기"].map(
                  (item) => (
                    <div key={item} className="rounded-lg bg-white/10 px-4 py-3 text-sm">
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {workerValues.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-blue-100 bg-white p-5 shadow-lg shadow-blue-950/5"
              >
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  {value.badge}
                </span>
                <h3 className="mt-5 text-lg font-bold leading-7 text-[#071B3A]">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
