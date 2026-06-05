import Link from "next/link"
import Steps from "./(components)/steps"
import PricingPlans from "./(components)/pricingPlans"

const benefits = [
  {
    title: "Native teachers",
    description:
      "All lessons are taught by experienced native speakers from Barcelona with a clear, neutral accent.",
    icon: "01",
  },
  {
    title: "Structured curricula",
    description:
      "Lessons are aligned with the Common European Framework (A1–C1) so you always know your level.",
    icon: "02",
  },
  {
    title: "Fully online & flexible",
    description:
      "Learn from anywhere with live online sessions and downloadable materials you can review anytime.",
    icon: "03",
  },
] as const

export default function Homepage() {
  return (
    <>
      <header className="relative min-h-[60vh] flex items-center overflow-hidden px-6 py-24 sm:px-12 sm:py-28 lg:px-16 bg-[url('/homepagepic.webp')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/75 to-[color-mix(in_srgb,var(--indigo)_35%,transparent)]" />
        <div
          className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-[var(--indigo)]/25 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-[var(--amber)]/20 blur-3xl"
          aria-hidden
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <div className="max-w-2xl text-left text-white">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--indigo-light)] backdrop-blur-sm">
              Learn Catalan/Spanish with confidence
            </p>
            <h1 className="mt-6 text-left text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl 2xl:text-7xl">
              Welcome to Júlia&apos;s lessons
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg lg:text-xl">
              Structured, friendly online lessons to take you from beginner to fluent,
              taught by an experienced native tutor from Barcelona.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/lessons">
                <button className="inline-flex items-center rounded-full bg-[var(--amber)] px-7 py-3.5 text-base font-semibold text-slate-950 shadow-lg shadow-amber-500/25 transition hover:bg-amber-300 hover:shadow-amber-400/30 sm:text-lg 2xl:text-2xl">
                  View lessons
                </button>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-[var(--indigo-light)] hover:bg-white/10 sm:text-base"
              >
                Talk to me
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto my-24 w-[92%] max-w-6xl space-y-28 sm:space-y-32">
        <section className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
            Why learn with me
          </p>
          <h2 className="mx-auto mt-3 max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl 2xl:text-4xl">
            A clear path from first words to fluent conversation
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-[var(--foreground-muted)] sm:text-base lg:text-lg">
            Pordon School combines native tutors, structured materials, and flexible online lessons so you can
            build real confidence in Catalan – whether you are preparing for life in Barcelona or an official exam.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-5 text-left sm:grid-cols-3 sm:gap-6">
            {benefits.map((item) => (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--indigo)]/15"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--indigo)] to-[var(--amber)] opacity-0 transition group-hover:opacity-100" />
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--indigo-muted)] text-sm font-semibold text-[var(--indigo)]">
                  {item.icon}
                </span>
                <h3 className="mt-4 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--foreground-muted)]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 items-center justify-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="space-y-4 text-left ml-10 md:pr-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
              How it works
            </p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl 2xl:text-4xl">
              Start learning Catalan in four simple steps
            </h2>
            <p className="text-sm leading-relaxed text-[var(--foreground-muted)] sm:text-base lg:text-lg">
              Choose the type of lessons that matches your goals, select a plan, and schedule a time that works for
              you. We handle materials, planning and progress tracking.
            </p>
          </div>
          <div className="p-6 ml-5 sm:p-8 lg:p-10">
            <Steps />
          </div>
        </section>

        <section
          id="about"
          className="grid grid-cols-1 items-center gap-10 overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 shadow-sm sm:gap-12 sm:p-8 md:grid-cols-2 md:gap-14 lg:p-10"
        >
          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            
            <img
              src="/teacher.jpeg"
              alt="Catalan tutor"
              className="relative aspect-[4/5] w-full rounded-2xl object-cover shadow-xl ring-1 ring-[var(--border-subtle)]"
            />
          </div>
          <div className="space-y-4 text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
              About me
            </p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Your guide to Catalan/Spanish
            </h2>
            <p className="text-sm leading-relaxed text-[var(--foreground-muted)] sm:text-base">
              I have been a full time language tutor for 6 years, working with people from many different countries and backgrounds. I sepecialize increating personalized and engaging lessons to help you achieve your personal language goals!
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center text-sm font-semibold text-[var(--primary)] transition hover:text-[var(--indigo)]"
            >
              Get in touch →
            </Link>
          </div>
        </section>

        {/*<section className="space-y-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
            Pricing
          </p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl 2xl:text-4xl">
            Simple monthly plans for consistent progress
          </h2>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-[var(--foreground-muted)] sm:text-base lg:text-lg">
            Pick how many lessons you want per week. You can upgrade, pause, or change your plan at any time.
          </p>
          <PricingPlans />
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface)] px-6 py-12 text-center shadow-md sm:px-12 sm:py-14">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--indigo-soft)] via-transparent to-[var(--primary-soft)]"
            aria-hidden
          />
          <div className="relative">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Ready to start speaking Catalan?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--foreground-muted)] sm:text-base lg:text-lg">
              Tell us a bit about your goals and schedule, and we&apos;ll recommend the best lesson type and plan for
              you.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/lessons">
                <button className="inline-flex items-center rounded-full bg-[var(--amber)] px-7 py-3.5 text-base font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300 sm:text-lg 2xl:text-2xl">
                  Book your first lesson
                </button>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-[var(--indigo)] px-6 py-3 text-sm font-semibold text-[var(--indigo)] transition hover:bg-[var(--indigo-soft)] sm:text-base"
              >
                Ask a question
              </Link>
            </div>
          </div>
        </section>*/}
      </main>
    </>
  )
}
