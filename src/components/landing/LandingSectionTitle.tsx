type LandingSectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
};

export function LandingSectionTitle({
  eyebrow,
  title,
  description,
  tone = "light"
}: LandingSectionTitleProps) {
  const isDark = tone === "dark";
  const eyebrowColor = isDark ? "text-blue-200" : "text-blue-700";
  const titleColor = isDark ? "text-white" : "text-[#071B3A]";
  const descriptionColor = isDark ? "text-blue-100/80" : "text-slate-600";

  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className={`text-sm font-bold ${eyebrowColor}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-2xl font-bold tracking-normal sm:text-3xl ${titleColor}`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-base leading-7 ${descriptionColor}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
