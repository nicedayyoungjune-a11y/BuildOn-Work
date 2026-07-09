import Link from "next/link";

export function LandingCta() {
  return (
    <section className="bg-[#071B3A] px-5 py-18 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-white/8 p-6 text-center shadow-2xl shadow-blue-950/30 sm:p-10">
        <p className="text-sm font-bold text-blue-200">BuildOn Work</p>
        <h2 className="mt-3 break-keep text-3xl font-bold tracking-normal sm:text-4xl">
          현장에 맞는 인력관리 흐름을 함께 검증해보세요
        </h2>
        <p className="mx-auto mt-4 max-w-2xl break-keep text-base leading-7 text-blue-100/80">
          현재는 화면 흐름 검증 단계입니다. 근로자와 현장소장이 실제로 필요한 정보를
          확인하고, 이후 파일럿 운영을 통해 기능을 순차적으로 연결할 예정입니다.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/worker/jobs"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-white px-6 text-base font-bold text-[#071B3A] shadow-lg shadow-blue-950/20 transition-colors hover:bg-blue-50"
          >
            일자리 화면 보기
          </Link>
          <Link
            href="/company/dashboard"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-blue-600 px-6 text-base font-bold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-700"
          >
            현장관리 화면 보기
          </Link>
        </div>
        <p className="mt-5 text-xs leading-5 text-blue-100/60">
          실제 지원, 인력 요청, 출근 처리 기능은 이후 단계에서 연결됩니다. 지금은 화면
          흐름을 확인하는 단계입니다.
        </p>
      </div>
    </section>
  );
}
