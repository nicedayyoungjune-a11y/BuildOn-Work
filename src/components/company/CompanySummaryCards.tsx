type CompanySummaryItem = {
  label: string;
  value: string;
  description: string;
};

type CompanySummaryCardsProps = {
  items: CompanySummaryItem[];
};

export function CompanySummaryCards({ items }: CompanySummaryCardsProps) {
  return (
    <section aria-label="현장 요약" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-5"
        >
          <p className="text-sm font-semibold text-slate-500">{item.label}</p>
          <p className="mt-2 text-2xl font-bold text-[#071B3A] sm:text-3xl">{item.value}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
        </div>
      ))}
    </section>
  );
}
