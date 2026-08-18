"use client";
import {motion} from "framer-motion"
import { CtaSection } from "../(components)/cta-section";
import { FiGlobe } from "react-icons/fi";
import Link from "next/link";

const lessonTypes = [
  {
    id: "1",
    name: "Conversational",
    price: "35",
    description: "Practice speaking through a variety of topics",
    features: ["50 min lessons", "Vocabulary lists"],
    highlighted: false,
  },
  {
    id: "2",
    name: "General",
    price: "35",
    description: "Cover speaking, grammar and vocabulary.",
    features: ["50 min lessons", "Materials included"],
    highlighted: true,
  },
  {
    id: "3",
    name: "Exams",
    price: "39",
    description: "Official Ramon Llull & Generalitat de Catalunya exams",
    features: ["50 min lessons", "Mock exams included"],
    highlighted: false,
  },
] as const;

const cefrLevels = [
  {
    name: "A1",
    title: "Beginner",
    description:
      "You can understand and use basic expressions and simple phrases for everyday situations.",
    bgColor: "bg-blue-200"
  },
  {
    name: "A2",
    title: "Pre-intermediate",
    description:
      "You can communicate in simple everyday situations, understand common expressions, and talk about familiar topics.",
    bgColor: "bg-cyan-200"
  },
  {
    name: "B1",
    title: "Intermediate",
    description:
      "You can handle most everyday situations, express your opinions, and talk about experiences, plans, and familiar topics.",
    bgColor: "bg-green-200"
  },
  {
    name: "B2",
    title: "Upper-intermediate",
    description:
      "You can communicate confidently with native speakers, discuss a wide range of topics, and understand more complex texts and conversations.",
    bgColor: "bg-yellow-200"
  },
  {
    name: "C1",
    title: "Advanced",
    description:
      "You can communicate fluently and flexibly, express ideas precisely, and understand complex texts and conversations.",
    bgColor: "bg-orange-200"
  },
  {
    name: "C2",
    title: "Proficiency",
    description:
      "You can understand virtually everything you hear or read and express yourself fluently, precisely, and naturally.",
    bgColor: "bg-purple-200"
  }
];

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

      <main>
        <motion.section className="section-beige text-center mx-auto pt-24 pb-15"
        initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity:1, y:0}}
      viewport={{ 
        once: true,    
        amount: 0.3    
      }}
      transition={{ duration: 0.6, delay:0.3 }}>
        <div className="w-[85%] sm:w-[90%] mx-auto">
          <h2>
            Lesson types
          </h2>
          <h3>
            Find the right fit for your learning style
          </h3>
          {/* <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-[var(--foreground-muted)] sm:text-base lg:text-lg">
            All lessons are 50 minutes, taught online by native tutors from Barcelona.
          </p> */}

          <div className="my-20 grid grid-cols-1 items-stretch gap-6 md:grid-cols-3 md:gap-8">
            {lessonTypes.map((lesson, index) => {
              if (lesson.highlighted) {
                return (
                  <div
                    key={lesson.id}
                    className="relative h-full rounded-2xl bg-gradient-to-br from-[var(--indigo)] via-[var(--indigo-light)] to-[var(--amber)] p-[4px] shadow-xl shadow-[var(--indigo)]/25 transition duration-300 hover:-translate-y-5 scale-105 hover:scale-110 hover:shadow-2xl"
                  >
                    <span className="absolute -top-3.5 right-6 z-20 rounded-full bg-[var(--amber)] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-md">
                      Most popular
                    </span>
                    <motion.article
                      className="relative flex h-full flex-col justify-between overflow-hidden rounded-[14px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-slate-100 text-center lg:p-10"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-[var(--indigo-light)]">
                          {lesson.name}
                        </h3>
                        <p className="mt-4 text-4xl font-extrabold tracking-tight text-slate-100">
                          ${lesson.price}
                          <span className="text-base font-medium text-slate-400">
                            /lesson
                          </span>
                        </p>
                        <p className="mt-4 text-sm leading-relaxed text-slate-300">
                          {lesson.description}
                        </p>
                        <ul className="mt-6 space-y-3">
                          {lesson.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center justify-center gap-2 text-sm text-slate-300"
                            >
                              <span className="text-[var(--indigo-light)]" aria-hidden>
                                ✓
                              </span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Link
                        href={`/lessons/${lesson.id}`}
                        className="mt-8 block w-full rounded-full bg-[var(--amber)] py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                      >
                        Learn more
                      </Link>
                    </motion.article>
                  </div>
                );
              }

              return (
                <motion.article
                  key={lesson.id}
                  className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-8 text-center shadow-md transition duration-300 hover:-translate-y-5 hover:shadow-xl"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-[var(--indigo)]">
                      {lesson.name}
                    </h3>
                    <p className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
                      ${lesson.price}
                      <span className="text-base font-medium text-[var(--foreground-muted)]">
                        /lesson
                      </span>
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-[var(--foreground-muted)]">
                      {lesson.description}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {lesson.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center justify-center gap-2 text-sm text-[var(--foreground-muted)]"
                        >
                          <span className="text-[var(--indigo)]" aria-hidden>
                            ✓
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={`/lessons/${lesson.id}`}
                    className="mt-8 block w-full rounded-full bg-[var(--indigo-soft)] py-3 text-center text-sm font-semibold text-[var(--indigo)] transition hover:bg-[var(--indigo)] hover:text-white"
                  >
                    Learn more
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
          
        </motion.section>
        <motion.section className="section-white text-left mx-auto py-20 sm:px-20"
        initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity:1, y:0}}
      viewport={{ 
        once: true,    // Only animates once (doesn't repeat if you scroll up and down)
        amount: 0.3    // Triggers when 30% of the element is visible
      }}
      transition={{ duration: 0.5 }}>
          <div className="flex flex-col sm:flex-col justify-around items-center gap-15 px-5">
            <div>
              <h2>A clear path for your progress</h2>
              <h3>I follow the CEFR levels</h3>
              <hr className="w-[50%] pb-5"/>
              <p  className="text-justify">My lessons are structured according to the Common European Framework of Reference - CEFR -, the international standard for language learning.</p>
            </div>
            <div className="border-1 p-5 border-[var(--border-subtle)] bg-[var(--indigo-muted)] rounded-sm shadow-sm">
              <div className="flex gap-5 items-center">
                <FiGlobe className="text-8xl text-[var(--indigo)]" />
                <div>
                  <p className="font-bold pb-2">What does this mean for you?</p>
                  <p>
                    Following the CEFR means you get clear goals, measurable progress and a learning journey that fits international standards — whether you’re learning for travel, work, study or personal growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pt-15 text-center px-5">
            {cefrLevels.map((level) => {
              return (
                <div key={level.name}>
                  <div className={`w-16 h-16 mx-auto flex items-center justify-center rounded-full ${level.bgColor} text-3xl font-bold`}>
                    {level.name}
                  </div>
                  <p className="font-bold p-2">{level.title}</p>
                  <p className="text-sm text-[var(--foreground-muted)]">{level.description}</p>
                </div>
              );
            })}
          </div>
        </motion.section>
        <CtaSection />
      </main>
      
    </>
  );
}
