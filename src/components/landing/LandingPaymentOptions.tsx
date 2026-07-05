import { LandingSectionTitle } from "./LandingSectionTitle";

const options = [
  {
    title: "근로자는 지급 조건을 미리 확인합니다.",
    description: "지원 전에 현장별 일당과 당일 지급, 주급 조건을 확인합니다."
  },
  {
    title: "건설사는 공고에 지급 조건을 적습니다.",
    description: "일자리 등록 시 현장에서 안내하는 지급 방식을 명확히 보여줍니다."
  },
  {
    title: "당일 지급은 자동 입금이 아닙니다.",
    description: "현장에서 안내한 방식으로 지급되는 것을 의미하며, 자동 송금 기능은 아직 포함하지 않습니다."
  }
];

export function LandingPaymentOptions() {
  return (
    <section className="bg-[#F3F7FF] px-5 py-18 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <LandingSectionTitle
          eyebrow="지급 조건 안내"
          title="현장별 지급 조건을 미리 확인할 수 있도록 준비합니다."
          description="당일 지급과 주급은 금융 기능이 아니라, 현장에서 안내하는 지급 조건을 뜻합니다."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {options.map((option) => (
            <div
              key={option.title}
              className="rounded-2xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-950/5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-lg font-bold text-blue-700">
                ✓
              </div>
              <h3 className="mt-5 text-xl font-bold leading-7 text-[#071B3A]">
                {option.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-slate-600">
                {option.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
