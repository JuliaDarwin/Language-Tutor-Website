import { ReactNode } from "react";

export function FeaturedCardShell({
  children,
  highlighted,
}: {
  children: ReactNode;
  highlighted: boolean;
}) {
  if (!highlighted) {
    return <>{children}</>;
  }

  return (
    <div className="relative z-10 w-full md:scale-[1.10] lg:scale-115">
      <div className="h-full rounded-2xl bg-gradient-to-br from-[var(--indigo)] via-[var(--indigo-light)] to-[var(--amber)] p-[4px] shadow-xl shadow-[var(--indigo)]/25 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
        {children}
      </div>
    </div>
  );
}

export const featuredCardInner =
  "relative flex h-full flex-col justify-between overflow-hidden rounded-[14px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-slate-100 text-center lg:p-10";

export const standardCardInner =
  "relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-8 text-center shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl";

export const cardTitleClass = (highlighted: boolean) =>
  `text-xl font-bold tracking-tight ${
    highlighted ? "text-[var(--indigo-light)] " : "text-[var(--indigo)]"
  }`;

export const cardBodyTextClass = (highlighted: boolean) =>
  highlighted ? "text-slate-300" : "text-[var(--foreground-muted)] dark:text-[var(--foreground)]";

export const cardPriceClass = (highlighted: boolean) =>
  `mt-4 text-4xl font-extrabold tracking-tight ${
    highlighted ? "text-slate-100" : "text-[var(--foreground)]"
  }`;

export const cardPriceMutedClass = (highlighted: boolean) =>
  highlighted ? "text-slate-400" : "text-[var(--foreground-muted)]";

export const cardCheckClass = (highlighted: boolean) =>
  highlighted ? "text-[var(--indigo-light)]" : "text-[var(--indigo)]";

export const popularBadgeClass =
  "absolute right-4 top-4 rounded-full bg-[var(--indigo-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--indigo-light)]";
