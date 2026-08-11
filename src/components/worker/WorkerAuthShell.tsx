import Link from "next/link";

type WorkerAuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  notice: string;
  children: React.ReactNode;
};

export function WorkerAuthShell({
  eyebrow,
  title,
  description,
  notice,
  children
}: WorkerAuthShellProps) {
  return (
    <main className="min-h-screen bg-[#F3F7FF] px-4 py-5 text-[#071B3A] sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Link href="/" className="text-sm font-bold text-blue-700">
                BuildOn Work
              </Link>
              <p className="mt-4 inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800">
                {eyebrow}
              </p>
              <h1 className="mt-4 break-keep text-2xl font-bold tracking-normal sm:text-4xl">
                {title}
              </h1>
              <p className="mt-3 max-w-2xl break-keep text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                {description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end">
              <Link
                href="/worker/jobs"
                className="inline-flex min-h-10 items-center justify-center rounded-md border border-blue-100 bg-blue-50 px-3 text-center text-xs font-bold text-blue-800 transition-colors hover:bg-blue-100 sm:px-4 sm:text-sm"
              >
                일자리 먼저 보기
              </Link>
              <Link
                href="/"
                className="inline-flex min-h-10 items-center justify-center rounded-md border border-blue-100 bg-white px-3 text-center text-xs font-bold text-blue-800 transition-colors hover:bg-blue-50 sm:px-4 sm:text-sm"
              >
                처음으로
              </Link>
            </div>
          </div>
        </header>

        <section className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold leading-6 text-blue-900 sm:mt-6 sm:p-5">
          {notice}
        </section>

        {children}
      </div>
    </main>
  );
}
