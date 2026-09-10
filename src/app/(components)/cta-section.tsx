
"use client";
import Link from "next/link";

export const CtaSection = () => {
    return(
        <>
         <section className="relative overflow-hidden border-t border-[var(--border-subtle)] bg-[url('/gaudi.jpg')] bg-cover bg-center px-6 py-16 text-center sm:px-12 sm:py-20 w-full text-white">
          <div className="absolute inset-0 bg-slate-900/75 dark:bg-slate-950/85"></div>
          <div className="relative z-10">
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Ready to start speaking Catalan?
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base lg:text-lg">
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
                className="btn-secondary border-white/40 text-white hover:bg-white/10"
              >
                Ask a question
              </Link>
            </div>
          </div>
        </section>
        </>
    )
}