import Link from "next/link";

type CompanyPageShellProps = {
  title: string;
  description: string;
  activeKey: "dashboard" | "sites" | "jobs" | "applicants" | "attendance";
  children: React.ReactNode;
};

const menuItems = [
  { href: "/company/dashboard", label: "현장관리", key: "dashboard" },
  { href: "/company/sites", label: "현장 목록", key: "sites" },
  { href: "/company/jobs", label: "일자리 관리", key: "jobs" },
  { href: "/company/applicants", label: "지원자 확인", key: "applicants" },
  { href: "/company/attendance", label: "출근 현황", key: "attendance" },
  { href: "/", label: "처음으로", key: "home" }
];

export function CompanyPageShell({
  title,
  description,
  activeKey,
  children
}: CompanyPageShellProps) {
  return (
    <main className="min-h-screen bg-[#F3F7FF] px-4 py-5 text-[#071B3A] sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Link href="/" className="text-sm font-bold text-blue-700">
                BuildOn Work
              </Link>
              <h1 className="mt-3 text-2xl font-bold tracking-normal sm:text-4xl">
                {title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                {description}
              </p>
            </div>
            <nav aria-label="건설사 메뉴" className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={item.key === activeKey ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center justify-center rounded-md border px-2 text-center text-xs font-bold leading-tight transition-colors sm:min-h-10 sm:px-4 sm:text-sm ${
                    item.key === activeKey
                      ? "border-[#0B1F3A] bg-[#0B1F3A] text-white shadow-sm shadow-blue-950/20"
                      : "border-blue-100 bg-blue-50 text-blue-800 hover:bg-blue-100"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <div className="mt-5 sm:mt-6">{children}</div>
      </div>
    </main>
  );
}
