type WorkerSummaryItem = {
  label: string;
  value: string;
  description: string;
};

type WorkerSummaryCardsProps = {
  items: WorkerSummaryItem[];
};

export function WorkerSummaryCards({ items }: WorkerSummaryCardsProps) {
  return (
    <section aria-label="근로자 요약" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-blue-100 bg-white p-5 shadow-lg shadow-blue-950/5"
        >
          <p className="text-sm font-semibold text-slate-500">{item.label}</p>
          <p className="mt-2 text-3xl font-bold text-[#071B3A]">{item.value}</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
        </div>
      ))}
    </section>
  );
}
