import { LandingSectionTitle } from "./LandingSectionTitle";

const trustItems = [
  {
    label: "현장 문제",
    title: "전화로 찾는 인력의 한계",
    description:
      "필요한 직종과 인원을 매번 전화와 문자로 확인하면 시간이 오래 걸리고 기록이 흩어집니다."
  },
  {
    label: "근로자 기준",
    title: "근로자가 먼저 보는 조건",
    description:
      "가까운 현장, 직종, 일당, 근무일, 지급 조건을 한눈에 확인할 수 있어야 합니다."
  },
  {
    label: "현장관리 기준",
    title: "현장소장이 확인해야 할 출근 현황",
    description:
      "지원자, 출근 예정자, 출근 완료 현황을 현장별로 쉽게 확인할 수 있어야 합니다."
  },
  {
    label: "검증 방향",
    title: "파일럿으로 검증할 서비스 흐름",
    description:
      "현재는 화면 흐름 검증 단계이며, 실제 기능은 현장 피드백을 바탕으로 순차 연결할 예정입니다."
  }
];

export function LandingTrustStats() {
  return (
    <section className="border-y border-blue-100 bg-[#F3F7FF] px-5 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <LandingSectionTitle
          eyebrow="신뢰 근거"
          title="왜 BuildOn Work가 필요한가"
          description="실제 운영 숫자를 앞세우기보다, 건설 현장에서 반복되는 불편과 확인해야 할 흐름을 먼저 정리했습니다."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-blue-100 bg-white p-5 shadow-lg shadow-blue-950/5"
            >
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                {item.label}
              </span>
              <h3 className="mt-5 break-keep text-xl font-bold leading-7 text-[#071B3A]">
                {item.title}
              </h3>
              <p className="mt-3 break-keep text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
