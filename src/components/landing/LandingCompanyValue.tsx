import { LandingSectionTitle } from "./LandingSectionTitle";

const companyValues = [
  { title: "현장 등록", status: "기본 정보" },
  { title: "필요한 직종과 인원 요청", status: "모집인원" },
  { title: "지원자 확인", status: "확인" },
  { title: "출근 예정자 확인", status: "예정" },
  { title: "부족 인원 파악", status: "관리" },
  { title: "근무 내역 확인", status: "내역" }
];

export function LandingCompanyValue() {
  return (
    <section id="company" className="bg-[#071B3A] px-5 py-18 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <LandingSectionTitle
          eyebrow="현장 인력 요청"
          title="현장소장을 위한 쉬운 인력 관리."
          description="필요한 직종과 모집인원을 등록하고, 지원자와 출근 예정자를 간편하게 확인하는 흐름을 준비합니다."
          tone="dark"
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-white/10 bg-white/8 p-5 shadow-2xl shadow-blue-950/30">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="text-sm font-semibold text-blue-200">현장관리</p>
                <h3 className="mt-2 text-2xl font-bold">평택 물류센터 공사</h3>
              </div>
              <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-100">
                인력 요청
              </span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["필요 직종", "철근 보조"],
                ["출근 예정자", "2명"],
                ["지원자 확인", "1건"]
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-white/10 p-4">
                  <p className="text-xs text-blue-100">{label}</p>
                  <p className="mt-2 text-lg font-bold">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-3">
              {["지원자 확인", "출근 현황 확인", "일당 · 지급 조건 확인"].map((item) => (
                <div key={item} className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#071B3A]">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {companyValues.map((value) => (
              <div
                key={value.title}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/8 p-4"
              >
                <p className="font-bold text-white">{value.title}</p>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
                  {value.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
