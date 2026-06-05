import ContactForm from "../(components)/contactform";

export default function ContactPage() {
  return (
    <>
      <header className="relative flex min-h-[40vh] items-center overflow-hidden px-6 py-16 sm:min-h-[45vh] sm:px-12 sm:py-20 bg-[url('/homepagepic.webp')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/75 to-[color-mix(in_srgb,var(--indigo)_35%,transparent)]" />
        <div
          className="pointer-events-none absolute -right-24 top-1/4 h-56 w-56 rounded-full bg-[var(--indigo)]/25 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-[var(--amber)]/20 blur-3xl"
          aria-hidden
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl text-left text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--indigo-light)]">
            Get in touch
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Contact us
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base">
            Tell us about your goals and we&apos;ll help you choose the right lesson plan.
          </p>
        </div>
      </header>

      <main className="mx-auto -mt-10 mb-24 w-[92%] max-w-xl sm:-mt-14">
        <ContactForm />
      </main>
    </>
  );
}
