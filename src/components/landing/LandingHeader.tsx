import Link from "next/link";

const menuItems = [
  { label: "서비스 소개", href: "/#service" },
  { label: "일자리 찾기", href: "/worker/jobs" },
  { label: "현장관리", href: "/company/dashboard" },
  { label: "이용 방법", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" }
];

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link href="/" className="min-w-0">
          <span className="block text-lg font-bold leading-6 text-[#071B3A]">
            BuildOn Work
          </span>
          <span className="mt-0.5 block text-xs font-semibold leading-5 text-slate-500 sm:text-sm">
            건설 일자리·현장 인력관리 플랫폼
          </span>
        </Link>

        <nav aria-label="주요 이동 메뉴" className="hidden items-center gap-6 lg:flex">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-bold text-slate-600 transition-colors hover:text-blue-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="grid grid-cols-2 gap-2 lg:flex lg:shrink-0">
          <Link
            href="/worker/jobs"
            className="inline-flex min-h-10 items-center justify-center rounded-full border border-blue-100 bg-white px-4 text-sm font-bold text-[#071B3A] shadow-sm transition-colors hover:bg-blue-50"
          >
            일자리 화면 보기
          </Link>
          <Link
            href="/company/dashboard"
            className="inline-flex min-h-10 items-center justify-center rounded-full bg-blue-700 px-4 text-sm font-bold text-white shadow-md shadow-blue-700/20 transition-colors hover:bg-blue-800"
          >
            현장관리 화면 보기
          </Link>
        </div>
      </div>
    </header>
  );
}
