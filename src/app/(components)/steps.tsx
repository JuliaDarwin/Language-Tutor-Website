"use client";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

const steps = [
  { id: "1", text: "Choose lesson type", description: "Choose if you want regular lessons, conversational or exam preparation." },
  { id: "2", text: "Buy lessons", description:"Choose your monthly plan and buy the first month." },
  { id: "3", text: "Schedule lessons", description: "Schedule the lessons on my calendar whenever it fits you best." },
  { id: "4", text: "Start learning", description:"Get ready for the first lesson!" },
] as const;

export default function Steps() {
  return (
    <div className="flex flex-col items-center gap-20">
      <ol className="grid grid-cols-1 sm:grid-cols-4 gap-10 w-[85%] mx-auto">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <motion.li
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center border b-2 border-[var(--border-subtle)] bg-[var(--indigo-soft)] py-8 px-5 rounded-full w-full"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--indigo-light)] text-sm font-bold text-[var(--indigo)] dark:bg-[var(--indigo)] dark:text-white shadow-sm">
                {index + 1}
              </span>
              <div className="mt-3 flex flex-col items-center text-center w-full"> 
                <p className="font-bold tracking-tight dark:text-white">{step.text}</p>
                <p className="mt-1.5 text-[var(--foreground-muted)] leading-relaxed">{step.description}</p>
              </div>
              {!isLast && (
                <div
                  aria-hidden
                  className="hidden sm:flex absolute -right-6 md:-right-8 top-1/2 -translate-y-1/2 translate-x-1/2 items-center pointer-events-none"
                >
                  <motion.div
                    className="flex items-center text-[var(--indigo)]"
                    initial={{ opacity: 0.3, color: "var(--indigo-light)", x: 0 }}
                    whileInView={{
                      opacity: 1,
                      color: "var(--indigo-strong)",
                      x: [0, 4, 0],
                    }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.2 + 0.1,
                      ease: "easeOut",
                    }}
                  >
                    <span className="w-5 h-[2px] bg-current rounded-full" />
                    <FiArrowRight className="text-2xl -ml-1 mr-5" />
                  </motion.div>
                </div>
              )}
            </motion.li>
          );
        })}
      </ol>
      <Link href="/lessons"><button className="btn-primary px-8">Book your first lesson</button></Link>
    </div>
  );
}



