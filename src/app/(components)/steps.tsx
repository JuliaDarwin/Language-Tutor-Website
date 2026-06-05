"use client";

const steps = [
  { id: "1", text: "Choose lesson type" },
  { id: "2", text: "Buy lessons" },
  { id: "3", text: "Schedule lessons" },
  { id: "4", text: "Start learning" },
] as const;

export default function Steps() {
  return (
    <ol className="relative space-y-0">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <li key={step.id} className="relative flex gap-5 pb-10 last:pb-0">
            {!isLast && (
              <span
                className="absolute left-5 top-12 h-[calc(100%-2.5rem)] w-px bg-[var(--indigo)]/70 /50"
                aria-hidden
              />
            )}
            <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--indigo-light)] text-sm font-semibold text-[var(--indigo)] dark:bg-[var(--indigo)] dark:text-white shadow-sm">
              {index + 1}
            </span>
            <div className="pt-1.5">
              <p className="text-base font-semibold tracking-tight dark:text-white">{step.text}</p>
              <p className="mt-1 text-sm text-[var(--foreground-muted)]">
                Step {index + 1} of {steps.length}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
