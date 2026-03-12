import Link from "next/link"
import ThemeToggle from "./(components)/theme-toggle"
import Steps from "./(components)/steps"
import WhyOurLessons from "./(components)/whyOurLessons"
import PricingPlans from "./(components)/pricingPlans"

export default function Homepage() {
  return(
    <>
       <header className="relative p-10 sm:p-20 bg-[url('/homepagepic.webp')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/70 to-slate-900/40" />
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-[90%] max-w-5xl text-left text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-200">
              Learn Catalan with confidence
            </p>
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold leading-tight">
              Welcome to Pordon&apos;s lessons
            </h1>
            <p className="mt-4 max-w-xl text-sm sm:text-base lg:text-lg text-slate-100">
              Structured, friendly online lessons to take you from beginner to fluent,
              taught by experienced native tutors from Barcelona.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link href="/lessons">
                <button className="inline-flex items-center rounded-full bg-amber-400 px-6 py-3 text-lg 2xl:text-3xl font-semibold text-slate-950 shadow-sm hover:bg-amber-300 transition-colors">
                        View lessons
                    </button>
              </Link>
              <Link
                href="/contact"
                className="text-sm sm:text-base font-semibold text-indigo-200 hover:text-white underline underline-offset-4"
              >
                Talk to a tutor
              </Link>
            </div>
          </div>
        </div>
      </header>
         <main className="mx-auto mt-16 mb-20 w-[90%] max-w-5xl space-y-20">
        {/* 1. Trust & benefits */}
        <section className="text-center space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
            Why learn with us
          </p>
          <h2 className="text-2xl sm:text-3xl 2xl:text-4xl font-semibold">
            A clear path from first words to fluent conversation
          </h2>
          <p className="mx-auto max-w-3xl text-sm sm:text-base lg:text-lg text-[var(--foreground-muted)]">
            Pordon School combines native tutors, structured materials, and flexible online lessons so you can
            build real confidence in Catalan – whether you are preparing for life in Barcelona or an official exam.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border-subtle)] p-5 shadow-sm">
              <h3 className="font-semibold mb-2">Native teachers</h3>
              <p className="text-sm text-[var(--foreground-muted)]">
                All lessons are taught by experienced native speakers from Barcelona with a clear, neutral accent.
              </p>
            </div>
            <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border-subtle)] p-5 shadow-sm">
              <h3 className="font-semibold mb-2">Structured curricula</h3>
              <p className="text-sm text-[var(--foreground-muted)]">
                Lessons are aligned with the Common European Framework (A1–C1) so you always know your level.
              </p>
            </div>
            <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border-subtle)] p-5 shadow-sm">
              <h3 className="font-semibold mb-2">Fully online & flexible</h3>
              <p className="text-sm text-[var(--foreground-muted)]">
                Learn from anywhere with live online sessions and downloadable materials you can review anytime.
              </p>
            </div>
          </div>
        </section>

        {/* 2. How it works */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 text-left">
            <p className="text-xs text-center font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
              How it works
            </p>
            <h2 className="text-2xl sm:text-3xl 2xl:text-4xl font-semibold">
              Start learning Catalan in four simple steps
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-[var(--foreground-muted)]">
              Choose the type of lessons that matches your goals, select a plan, and schedule a time that works for
              you. We handle materials, planning and progress tracking.
            </p>
          </div>
          <div className="rounded-2xl bg-[var(--surface)] p-6 lg:p-8 ">
            <Steps />
          </div>
        </section>

        {/* 4. Pricing preview */}
        <section className="space-y-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
            Pricing
          </p>
          <h2 className="text-2xl sm:text-3xl 2xl:text-4xl font-semibold">
            Simple monthly plans for consistent progress
          </h2>
          <p className="mx-auto max-w-3xl text-sm sm:text-base lg:text-lg text-[var(--foreground-muted)]">
            Pick how many lessons you want per week. You can upgrade, pause, or change your plan at any time.
          </p>
          <PricingPlans />
        </section>

        {/* 5. Final CTA */}
        <section className="rounded-2xl bg-[var(--surface)] border border-[var(--border-subtle)] px-6 py-10 sm:px-10 text-center shadow-md">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
            Ready to start speaking Catalan?
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base lg:text-lg text-[var(--foreground-muted)] mb-6">
            Tell us a bit about your goals and schedule, and we&apos;ll recommend the best lesson type and plan for
            you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/lessons">
              <button 
                    className="inline-flex items-center rounded-full bg-amber-400 px-6 py-3 text-lg 2xl:text-3xl font-semibold text-slate-950 shadow-sm hover:bg-amber-300 transition-colors">
                        Book your first lesson
                    </button> 
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-[var(--primary)] px-6 py-3 text-sm sm:text-base font-semibold text-[var(--primary)] hover:bg-[var(--primary-soft)] transition-colors"
            >
              Ask a question
            </Link>
          </div>
        </section>
      </main>
          
        
        </>
  ) 
}

/*tracking controls spacing between letters 
inset: 0 means top: 0;
right: 0;
bottom: 0;
left: 0;, --> to make the element fill all the container
*/