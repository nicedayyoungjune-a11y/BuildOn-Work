import { LandingSectionTitle } from "./LandingSectionTitle";

const faqs = [
  {
    question: "지금 바로 일자리 매칭이 가능한가요?",
    answer: "현재는 MVP 준비 단계이며, 경기·충청권 파일럿을 기준으로 개발 중입니다."
  },
  {
    question: "당일 지급은 바로 입금된다는 뜻인가요?",
    answer:
      "아닙니다. 당일 지급은 현장에서 안내한 지급 조건을 보여준다는 뜻이며, 실제 입금 기능은 이후 단계에서 검토합니다."
  },
  {
    question: "건설사는 어떤 일을 할 수 있나요?",
    answer:
      "현장 등록, 일자리 등록, 지원자 확인, 출근 예정자 확인, 출근 현황 확인을 목표로 합니다."
  },
  {
    question: "근로자는 어떻게 이용하나요?",
    answer:
      "가까운 건설 일자리를 확인하고, 원하는 현장의 출근 확정 여부를 확인하는 흐름을 준비하고 있습니다."
  },
  {
    question: "지원 가능한 지역은 어디인가요?",
    answer:
      "초기에는 경기·충청권 파일럿을 기준으로 준비합니다. 전국 확장은 서비스 검증 이후 단계입니다."
  },
  {
    question: "기능공 팀 매칭도 가능한가요?",
    answer:
      "기능공 팀 전체 계약은 이후 확장 후보입니다. 이번 단계에서는 건설 일용직 중심 흐름을 먼저 다룹니다."
  }
];

export function LandingFaq() {
  return (
    <section className="bg-white px-5 py-18 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <LandingSectionTitle
          eyebrow="FAQ"
          title="현장에서 헷갈릴 수 있는 내용을 먼저 안내합니다."
          description="현재 단계는 실제 운영 전, 건설 일자리와 인력 요청 흐름을 준비하는 단계입니다."
        />
        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm shadow-blue-950/5"
            >
              <h3 className="text-lg font-bold leading-7 text-[#071B3A]">
                {faq.question}
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
