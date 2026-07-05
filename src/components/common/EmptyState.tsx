type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-8 text-center shadow-sm shadow-blue-950/5">
      <h2 className="text-xl font-bold text-[#071B3A]">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}
