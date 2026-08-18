
"use client";
import Link from "next/link";

export const CtaSection = () => {
    return(
        <>
         <section className="relative overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface)] px-6 py-12 text-center shadow-sm sm:px-12 sm:py-14 w-full">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--indigo-soft)] via-transparent to-[var(--primary-soft)]"
            aria-hidden
          />
          <div className="relative">
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Ready to start speaking Catalan?
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--foreground-muted)] sm:text-base lg:text-lg">
              Tell us a bit about your goals and schedule, and we&apos;ll recommend the best lesson type and plan for
              you.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/lessons">
                <button className="btn-primary">
                  Book your first lesson
                </button>
              </Link>
              <Link
                href="/contact"
                className="btn-secondary"
              >
                Ask a question
              </Link>
            </div>
          </div>
        </section>
        </>
    )
}