const trustItems = [
  {
    label: "우선 지역",
    value: "경기·충청권",
    description: "가까운 현장부터 건설 일자리 흐름을 먼저 확인합니다."
  },
  {
    label: "핵심 대상",
    value: "건설 일용직 중심",
    description: "일자리 찾기, 지원자 확인, 출근 현황을 먼저 다룹니다."
  },
  {
    label: "지급 조건",
    value: "당일 지급 · 주급 확인",
    description: "현장별 일당과 지급 조건을 미리 볼 수 있게 준비합니다."
  },
  {
    label: "관리 방향",
    value: "현장 인력 관리",
    description: "현장소장이 출근 예정자와 근로자 상태를 확인하도록 돕습니다."
  }
];

export function LandingTrustStats() {
  return (
    <section className="border-y border-blue-100 bg-[#F3F7FF] px-5 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {trustItems.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-blue-100 bg-white p-5 shadow-lg shadow-blue-950/5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-lg font-bold text-blue-700">
              ✓
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-500">{item.label}</p>
            <p className="mt-2 text-2xl font-bold text-[#071B3A]">{item.value}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
