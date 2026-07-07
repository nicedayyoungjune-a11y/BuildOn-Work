import Link from "next/link";

type CompanyPageShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const menuItems = [
  { href: "/company/dashboard", label: "현장관리" },
  { href: "/company/sites", label: "현장" },
  { href: "/company/jobs", label: "일자리" },
  { href: "/company/applicants", label: "지원자" },
  { href: "/company/attendance", label: "출근" }
];

export function CompanyPageShell({ title, description, children }: CompanyPageShellProps) {
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
            <nav aria-label="건설사 메뉴" className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex min-h-10 items-center justify-center rounded-md border border-blue-100 bg-blue-50 px-2 text-center text-xs font-bold text-blue-800 transition-colors hover:bg-blue-100 sm:px-4 sm:text-sm"
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
