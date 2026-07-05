import Link from "next/link";

type WorkerPageShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const menuItems = [
  { href: "/worker/jobs", label: "일자리 찾기" },
  { href: "/worker/applications", label: "지원한 일자리" },
  { href: "/worker/my", label: "내 정보" }
];

export function WorkerPageShell({ title, description, children }: WorkerPageShellProps) {
  return (
    <main className="min-h-screen bg-[#F3F7FF] px-5 py-6 text-[#071B3A] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-2xl border border-blue-100 bg-white p-5 shadow-lg shadow-blue-950/5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Link href="/" className="text-sm font-bold text-blue-700">
                BuildOn Work
              </Link>
              <h1 className="mt-3 text-3xl font-bold tracking-normal sm:text-4xl">
                {title}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                {description}
              </p>
            </div>
            <nav aria-label="근로자 메뉴" className="flex flex-wrap gap-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-800 transition-colors hover:bg-blue-100"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <div className="mt-6">{children}</div>
      </div>
    </main>
  );
}
