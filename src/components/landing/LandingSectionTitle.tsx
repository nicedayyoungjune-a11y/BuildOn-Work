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
  const eyebrowStyle = isDark
    ? "border-white/15 bg-white/10 text-blue-100"
    : "border-blue-100 bg-blue-50 text-blue-800";
  const titleColor = isDark ? "text-white" : "text-[#071B3A]";
  const descriptionColor = isDark ? "text-blue-100/80" : "text-slate-600";

  return (
    <div className="mx-auto max-w-3xl text-center">
      <p
        className={`inline-flex rounded-full border px-4 py-1.5 text-base font-bold leading-6 sm:text-lg ${eyebrowStyle}`}
      >
        {eyebrow}
      </p>
      <h2 className={`mt-5 text-2xl font-bold tracking-normal sm:text-3xl ${titleColor}`}>
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
