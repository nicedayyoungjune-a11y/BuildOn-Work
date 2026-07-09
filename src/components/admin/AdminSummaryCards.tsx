type AdminSummaryItem = {
  label: string;
  value: string;
  description: string;
};

type AdminSummaryCardsProps = {
  items: AdminSummaryItem[];
};

export function AdminSummaryCards({ items }: AdminSummaryCardsProps) {
  const gridClassName =
    items.length >= 5
      ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
      : items.length === 4
        ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section
      aria-label="운영 현황 요약"
      className={gridClassName}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-5"
        >
          <p className="text-sm font-semibold text-slate-500">{item.label}</p>
          <p className="mt-2 text-2xl font-bold text-[#071B3A] sm:text-3xl">
            {item.value}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
        </div>
      ))}
    </section>
  );
}
