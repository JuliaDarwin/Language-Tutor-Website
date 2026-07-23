"use client";

import Link from "next/link";
import notFound from "@/app/notFound"; 
import WhyOurLessons from "@/app/(components)/whyOurLessons";
import Steps from "@/app/(components)/steps";
import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { motion } from "framer-motion";

//defining the lessons data:

const lessonsData = [
  {
    id: "1",
    name: "Conversational Lessons",
    description: "Practice speaking through a variety of topics",
    details:
      "Focus on fluency, pronunciation, and colloquial expressions. Ideal for students who want to travel or socialize.",
    features: ["50 min lessons", "Useful topics", "Listening practice"],
    image: "/conversational.jpg",
  },
  {
    id: "2",
    name: "General Lessons",
    description: "Cover speaking, grammar and vocabulary.",
    details:
      "A structured approach to learning the language foundations. We cover all four skills: reading, writing, listening, and speaking.",
    features: ["50 min lessons", "Materials included", "Homework assignments"],
    image: "/lessoncard.jpg",
  },
  {
    id: "3",
    name: "Exams",
    description: "Official Ramon Llull & Generalitat de Catalunya exams",
    details:
      "Intensive preparation for official certifications. We focus on exam techniques, time management, and specific exam contents.",
    features: [
      "50 min lessons",
      "Mocking exams included",
      "Correction included",
    ],
    image: "/aboutbackground.jpg",
  },
];

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = lessonsData.find((item) => item.id === lessonId);

  //Handle cases where the ID doesn't exist (e.g. /lessons/999)
  if (!lesson) {
    return notFound();
  }

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
          <Link
            href="/lessons"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--indigo-light)] hover:text-white transition mb-6"
          >
            ← Back to Lessons
          </Link>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {lesson.name}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base">
            {lesson.description}
          </p>
        </div>
      </motion.header>

      <main className="mx-auto my-24 w-[92%] max-w-6xl space-y-28 sm:space-y-32">
        {/* Section 1: Overview */}
        <motion.section className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16"
         initial={{ opacity: 0, y: 15 }}
         whileInView={{ opacity:1, y:0}}
         viewport={{ 
           once: true,    
           amount: 0.3    
         }}
         transition={{ duration: 0.6, delay:0.3 }}>
          <div className="relative mx-auto w-full max-w-md md:max-w-none order-2 md:order-1">
            
            <img
              src={lesson.image}
              alt={lesson.name}
              className="relative aspect-[4/3] w-full rounded-2xl shadow-xl object-cover"
            />
          </div>
          
          <div className="space-y-6 text-left order-1 md:order-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
              Overview
            </p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Lesson Details
            </h2>
            <p className="text-sm leading-relaxed text-[var(--foreground-muted)] sm:text-base">
              {lesson.details}
            </p>
            
            <ul className="space-y-3 pt-2">
              {lesson.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-[var(--foreground-muted)] sm:text-base">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--indigo-light)] text-xs font-bold text-[var(--indigo)]" aria-hidden>
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <SignedOut>
                <SignUpButton mode="modal" forceRedirectUrl="/auth-callback">
                  <button className="inline-flex items-center rounded-full bg-[var(--amber)] px-7 py-3.5 text-base font-semibold text-slate-950 shadow-lg shadow-amber-500/25 transition hover:bg-amber-300 hover:shadow-amber-400/30 sm:text-lg">
                    Buy Lessons
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <a
                  href="#pricing-plans"
                  className="inline-flex items-center rounded-full bg-[var(--amber)] px-7 py-3.5 text-base font-semibold text-slate-950 shadow-lg shadow-amber-500/25 transition hover:bg-amber-300 hover:shadow-amber-400/30 sm:text-lg hover:cursor-pointer"
                >
                  Buy Lessons
                </a>
              </SignedIn>
            </div>
          </div>
        </motion.section>

        {/* Section 2: Why Our Lessons */}
        <motion.section className="text-center space-y-6"
        initial={{ opacity: 0, y: 15 }}
         whileInView={{ opacity:1, y:0}}
         viewport={{ 
           once: true,    
           amount: 0.3    
         }}
         transition={{ duration: 0.6 }}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
              Why learn with me
            </p>
            <h2 className="mx-auto mt-3 max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl 2xl:text-4xl">
              Why {lesson.name}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-[var(--foreground-muted)] sm:text-base lg:text-lg">
              Get the resources, guidance, and community support you need to succeed.
            </p>
          </div>
          <WhyOurLessons />
        </motion.section>

        {/* Section 3: Get Started Steps */}
        <motion.section className="grid grid-cols-1 items-center md:ml-10 gap-12 md:grid-cols-2 md:gap-16"
        initial={{ opacity: 0, y: 15 }}
         whileInView={{ opacity:1, y:0}}
         viewport={{ 
           once: true,    
           amount: 0.3    
         }}
         transition={{ duration: 0.6 }}>
          <div className="space-y-4 text-left md:ml-10 md:pr-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
              How it works
            </p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl 2xl:text-4xl">
              Start learning in four simple steps
            </h2>
            <p className="text-sm leading-relaxed text-[var(--foreground-muted)] sm:text-base lg:text-lg">
              Our streamlined process helps you start lessons quickly. Book your package, pick your times, and meet your native tutor online.
            </p>
            <div className="relative mx-auto w-full max-w-md md:max-w-none pt-4">
              {/*<img
                src="/getstarted.jpg"
                alt="Get started"
                className="relative aspect-[4/3] w-full rounded-2xl object-cover shadow-xl ring-1 ring-[var(--border-subtle)]"
              />*/}
            </div>
          </div>
          <div className="p-6 ml-5 sm:p-8 lg:p-10">
            <Steps />
          </div>
        </motion.section>

        {/* Section 4: Choose Your Package 
        <section className="space-y-6 text-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
              Pricing
            </p>
            <h2 id="pricing-plans" className="text-2xl font-semibold tracking-tight sm:text-3xl 2xl:text-4xl">
              Choose Your Package
            </h2>
            <p className="mx-auto max-w-3xl text-sm leading-relaxed text-[var(--foreground-muted)] sm:text-base lg:text-lg">
              Find a structured monthly pricing plan that fits your pace and budget.
            </p>
          </div>
          <PricingPlans />
        </section>*/}
      </main>
    </>
  );
}
