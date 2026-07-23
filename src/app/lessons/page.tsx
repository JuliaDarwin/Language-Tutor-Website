"use client";
import {motion} from "framer-motion"

import Link from "next/link";
import {
  FeaturedCardShell,
  cardBodyTextClass,
  cardCheckClass,
  cardPriceClass,
  cardPriceMutedClass,
  cardTitleClass,
  featuredCardInner,
  popularBadgeClass,
  standardCardInner,
} from "../(components)/featuredCardShell";

const lessonTypes = [
  {
    id: "1",
    name: "Conversational",
    price: "28",
    description: "Practice speaking through a variety of topics",
    features: ["50 min lessons", "Vocabulary lists"],
    highlighted: false,
  },
  {
    id: "2",
    name: "General",
    price: "30",
    description: "Cover speaking, grammar and vocabulary.",
    features: ["50 min lessons", "Materials included"],
    highlighted: true,
  },
  {
    id: "3",
    name: "Exams",
    price: "35",
    description: "Official Ramon Llull & Generalitat de Catalunya exams",
    features: ["50 min lessons", "Mock exams included"],
    highlighted: false,
  },
] as const;

export default function Lessons() {
  return (
    <>
      <motion.header className="relative flex min-h-[40vh] items-center overflow-hidden px-6 py-16 sm:min-h-[45vh] sm:px-12 sm:py-20 bg-[url('/homepagepic.webp')] bg-cover bg-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: 0.2,
        ease: "easeOut" 
      }}>
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
            Our offerings
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Lesson types
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base">
            Choose the path that fits your goals — from everyday conversation to official exam prep.
          </p>
        </div>
      </motion.header>

      <main className="mx-auto my-24 w-[92%] max-w-6xl">
        <motion.section className="text-center"
        initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity:1, y:0}}
      viewport={{ 
        once: true,    
        amount: 0.3    
      }}
      transition={{ duration: 0.6, delay:0.3 }}>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
            Lesson types
          </p>
          <h2 className="mx-auto mt-3 max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl 2xl:text-4xl">
            Find the right fit for your learning style
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-[var(--foreground-muted)] sm:text-base lg:text-lg">
            All lessons are 50 minutes, taught online by native tutors from Barcelona.
          </p>

          <div className="mt-10 grid grid-cols-1 items-stretch gap-6 md:grid-cols-3 md:items-center md:gap-8">
            {lessonTypes.map((lesson, index) => (
              <FeaturedCardShell key={lesson.id} highlighted={lesson.highlighted}>
                <motion.article
                  className={lesson.highlighted ? featuredCardInner : standardCardInner}
                  initial={{ opacity: 0, y: 15 }}
                   whileInView={{ opacity:1, y:0}}
                   viewport={{
                     once: true
                   }}
                   transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  {lesson.highlighted && (
                    <span className={popularBadgeClass}>Most popular</span>
                  )}
                  <div>
                    <h3 className={cardTitleClass(lesson.highlighted)}>{lesson.name}</h3>
                    <p className={cardPriceClass(lesson.highlighted)}>
                      ${lesson.price}
                      <span
                        className={`text-base font-medium ${cardPriceMutedClass(lesson.highlighted)}`}
                      >
                        /lesson
                      </span>
                    </p>
                    <p
                      className={`mt-4 text-sm leading-relaxed ${cardBodyTextClass(lesson.highlighted)}`}
                    >
                      {lesson.description}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {lesson.features.map((feature) => (
                        <li
                          key={feature}
                          className={`flex items-center justify-center gap-2 text-sm ${cardBodyTextClass(lesson.highlighted)}`}
                        >
                          <span className={cardCheckClass(lesson.highlighted)} aria-hidden>
                            ✓
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={`/lessons/${lesson.id}`}
                    className={`mt-8 block w-full rounded-full py-3 text-center text-sm font-semibold transition ${
                      lesson.highlighted
                        ? "bg-[var(--amber)] text-slate-950 hover:bg-amber-300"
                        : "bg-[var(--indigo-soft)] text-[var(--indigo)] hover:bg-[var(--indigo)] hover:text-white"
                    }`}
                  >
                    Learn more
                  </Link>
                </motion.article>
              </FeaturedCardShell>
            ))}
          </div>
        </motion.section>

        <motion.section className="relative mt-20 overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface)] dark:bg-[var(--foreground-muted)] px-6 py-12 text-center shadow-md sm:mt-24 sm:px-12 sm:py-14"
        initial={{ opacity: 0, y: 15 }}
         whileInView={{ opacity:1, y:0}}
         viewport={{ 
           once: true,    
           amount: 0.3    
         }}
         transition={{ duration: 0.6 }}>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--indigo-soft)] via-transparent to-[var(--primary-soft)]"
            aria-hidden
          />
          <div className="relative">
            <h2 className="text-2xl font-semibold dark:text-[var(--background)] tracking-tight sm:text-3xl">
              Want something different?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--foreground-muted)] dark:text-[var(--background)] sm:text-base lg:text-lg">
              Leave us a message with your request and we&apos;ll get back to you as soon as possible.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-[var(--amber)] px-7 py-3.5 text-base font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300 sm:text-lg"
              >
                Contact us
              </Link>
            </div>
          </div>
        </motion.section>
      </main>
    </>
  );
}
