export function LandingCta() {
  return (
    <section className="bg-[#071B3A] px-5 py-18 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-white/8 p-6 text-center shadow-2xl shadow-blue-950/30 sm:p-10">
        <p className="text-sm font-bold text-blue-200">BuildOn Work</p>
        <h2 className="mt-3 text-3xl font-bold tracking-normal sm:text-4xl">
          지금 바로 BuildOn Work를 시작하세요.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-blue-100/80">
          근로자는 가까운 일자리를 찾고, 현장소장은 필요한 인력을 요청하는
          건설인력 플랫폼을 준비하고 있습니다.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="#worker"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-white px-6 text-base font-bold text-[#071B3A] shadow-lg shadow-blue-950/20 transition-colors hover:bg-blue-50"
          >
            내 주변 일자리 찾기
          </a>
          <a
            href="#company"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-blue-600 px-6 text-base font-bold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-700"
          >
            현장 인력 요청하기
          </a>
          <a
            href="#faq"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/20 px-6 text-base font-bold text-white transition-colors hover:bg-white/10"
          >
            파일럿 상담 문의하기
          </a>
        </div>
        <p className="mt-5 text-xs leading-5 text-blue-100/60">
          현재 버튼은 화면 검토용 임시 CTA이며 실제 기능은 연결하지 않았습니다.
        </p>
      </div>
    </section>
  );
}
