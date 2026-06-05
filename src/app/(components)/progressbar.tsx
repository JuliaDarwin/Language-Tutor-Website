"use client";

const labels = ["Lessons", "Contact info", "Summary"];

function ProgressBar({ step }: { step: number }) {
  const steps = [1, 2, 3];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-2">
        {steps.map((num, index) => (
          <div key={num} className="flex flex-1 items-center last:flex-none">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                step >= num
                  ? "bg-[var(--indigo-light)] dark:bg-[var(--indigo)] text-[var(--indigo)] dark:text-white"
                  : "bg-[var(--border-subtle)] text-[var(--foreground-muted)]"
              }`}
            >
              {num}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`mx-2 h-0.5 flex-1 rounded-full transition-colors ${
                  step > num ? "bg-[var(--indigo-light)]/70" : "bg-[var(--border-subtle)]"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-sm font-semibold tracking-tight text-[var(--foreground)]">
        {labels[step - 1]}
      </p>
    </div>
  );
}

export default ProgressBar;
