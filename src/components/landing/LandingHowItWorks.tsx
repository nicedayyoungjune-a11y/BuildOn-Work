import { LandingSectionTitle } from "./LandingSectionTitle";

const workerSteps = ["원하는 직종과 지역 선택", "일자리 확인", "지원 전 정보 확인", "출근 확정 확인"];
const companySteps = [
  "현장 등록",
  "일자리 등록",
  "지원자 확인",
  "출근 예정자와 출근 현황 확인"
];

export function LandingHowItWorks() {
  return (
    <section className="bg-white px-5 py-18 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <LandingSectionTitle
          eyebrow="이용 방법"
          title="근로자와 건설사가 쓰기 쉬운 4단계 흐름."
          description="복잡한 설명보다 현장에서 바로 이해할 수 있는 이용 방법을 먼저 보여줍니다."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <FlowCard title="근로자 이용 방법" steps={workerSteps} />
          <FlowCard title="건설사 이용 방법" steps={companySteps} />
        </div>
      </div>
    </section>
  );
}

function FlowCard({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-[#F8FBFF] p-5 shadow-lg shadow-blue-950/5 sm:p-6">
      <h3 className="text-xl font-bold text-[#071B3A]">{title}</h3>
      <ol className="mt-6 space-y-4">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-700 text-sm font-bold text-white shadow-md shadow-blue-700/20">
              {index + 1}
            </span>
            <span className="pt-1.5 text-base font-semibold leading-7 text-slate-700">
              {step}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
