"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Steps from "./(components)/steps";
import { CtaSection } from "./(components)/cta-section";
import { motion, useInView, animate } from "framer-motion";
import {
  MdPerson,
  MdSchedule,
  MdLaptop,
  MdOutlineForum,
  MdOutlineMenuBook,
  MdTune,
  MdSchool,
  MdOutlineLanguage,
  MdStar
} from "react-icons/md";

const benefits = [
  {
    title: "Conversation",
    description:
      "Improve your speaking skills and gain confidence in real life situations.",
    icon: MdOutlineForum,
  },
  {
    title: "Grammar & Vocabulary",
    description:
      "Build a strong foundation and expand your vocabulary naturally",
    icon: MdOutlineMenuBook,
  },
  {
    title: "Customized Lessons",
    description:
      "Every lesson is adapted to your goals, level and learning style.",
    icon: MdTune,
  },
  {
    title: "Exam Preparation",
    description:
      "Prepare for official exams like DELE/Generalitat with personalized practice and feedback",
    icon: MdSchool,
  },
];

const reviews = [
  {
    name: 'Emma',
    language: 'Spanish',
    review: 'I really enjoy my lessons! They are well structured, engaging, and adapted perfectly to my level. I feel much more confident speaking Spanish now.',
    rating: 5
  },
  {
    name: 'James',
    language: 'Spanish',
    review: 'The lessons are always interesting and practical. I especially appreciate how much time we spend actually speaking and using Spanish in real situations.',
    rating: 5
  },
  {
    name: 'Sophie',
    language: 'Catalan',
    review: 'A fantastic teacher who makes every lesson enjoyable. I have learned so much in a short time and finally feel comfortable having basic conversations in Catalan.',
    rating: 5
  },
  {
    name: 'Michael',
    language: 'Spanish',
    review: 'Every lesson is tailored to what I need, and I always leave feeling like I have learned something useful. Highly recommended!',
    rating: 5
  }
];

const faqs = [
  {
    question: 'What languages do you teach?',
    answer:
      'I teach Spanish and Catalan, with lessons adapted to your level, goals and interests.'
  },
  {
    question: 'Do you teach complete beginners?',
    answer:
      'Yes! We can start from the basics and gradually build your confidence in speaking, listening, reading and writing.'
  },
  {
    question: 'Are the lessons focused on conversation?',
    answer:
      'Yes. Conversation is an important part of my lessons, but we also work on grammar, vocabulary and pronunciation when needed.'
  },
  {
    question: 'Can I learn Spanish for travel?',
    answer:
      'Absolutely. We can focus on practical vocabulary, everyday situations and the expressions you are most likely to use while travelling.'
  },
  {
    question: 'Can you help me prepare for an exam?',
    answer:
      'Yes. Lessons can be tailored to the requirements of your exam, including grammar, vocabulary, writing, speaking and exam strategies.'
  },
  {
    question: 'Do you offer Catalan lessons for Spanish speakers?',
    answer:
      'Yes. If you already speak Spanish, we can use similarities between the two languages to help you learn Catalan more efficiently.'
  },
  {
    question: 'How are lessons adapted to my level?',
    answer:
      'I assess your current level and adapt the materials, activities and pace of the lessons to your specific needs.'
  },
  {
    question: 'What happens in the trial lesson?',
    answer:
      'We will talk about your goals, interests and previous experience with the language, and do some activities so I can understand your level and learning needs.'
  },
  {
    question: 'Do you provide materials?',
    answer:
      'Yes. I provide lesson materials and activities based on what we work on during the class.'
  },
  {
    question: 'Can I request lessons about specific topics?',
    answer:
      'Of course. We can use topics that interest you, such as travel, culture, work, food, current events or everyday life.'
  },
  {
    question: 'How often should I take lessons?',
    answer:
      'It depends on your goals and schedule. One or two lessons per week is a good starting point, but we can adjust this as you progress.'
  },
  {
    question: 'Can I reschedule a lesson?',
    answer:
      'Yes, lessons can be rescheduled according to the platform’s cancellation and rescheduling policy.'
  }
];

function Counter({
  from = 0,
  to,
  duration = 2,
  prefix = "+ ",
}: {
  from?: number;
  to: number;
  duration?: number;
  prefix?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    const node = ref.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = `${prefix}${Math.floor(value)}`;
      },
    });

    return () => controls.stop();
  }, [isInView, from, to, duration, prefix]);

  return (
    <p ref={ref} className="text-5xl sm:text-6xl font-bold">
      {prefix}{from}
    </p>
  );
}

export default function Homepage() {

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
    {/* //hero */}
      <motion.header className="relative min-h-[60vh] flex items-end overflow-hidden px-8 pt-6 pb-0 sm:px-12 sm:pt-6 sm:pb-0 lg:px-16 lg:pt-12 lg:pb-0 bg-[var(--background-alt)] bg-cover bg-center"
            // 1. Start invisible and pushed up by 50 pixels
 initial={{ opacity: 0, y: -50 }}
      
      // 2. Animate to fully visible and its natural position (y: 0)
      animate={{ opacity: 1, y: 0 }}
      
      // 3. Control the speed and feel
      transition={{ 
        duration: 0.8, 
        delay: 0.2,
        ease: "easeOut" 
      }}>

        <div className="relative z-10 mx-auto w-full max-w-7xl flex flex-col-reverse md:flex-row items-end justify-between gap-3 lg:gap-20">
          <div className="max-w-2xl text-left text-[var(--foreground)] flex-1 pb-16 md:pb-24 pt-8">
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--indigo-soft)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--indigo)] backdrop-blur-sm">
              Learn Catalan/Spanish with confidence
            </p>
            <h1 className="mt-6 text-left text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl 2xl:text-7xl">
              Learn a language.
              <span className="block italic text-[var(--primary)]">Open new doors.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--foreground-muted)] sm:text-lg lg:text-xl">
              Structured, friendly online lessons to take you from beginner to fluent,
              taught by an experienced native tutor from Barcelona.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/lessons">
                <button className="btn-primary">
                  View lessons
                </button>
              </Link>
              <Link
                href="/contact"
                className="btn-secondary"
              >
                Talk to me
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-8 pt-12">
              <div className="flex flex-col items-center gap-1 text-center">
                <MdPerson className="text-4xl text-[var(--primary)]" />
                <p className="font-semibold text-md">1-on-1 LESSONS</p>
                <p className="text-xs text-[var(--foreground-muted)]">100% personalized</p>
              </div>

              <div className="flex flex-col items-center text-center gap-1">
                <MdSchedule className="text-4xl text-[var(--primary)]" />
                <p className="font-semibold text-md">Flexible schedule</p>
                <p className="text-xs text-[var(--foreground-muted)]">Learn when it fits you</p>
              </div>

              <div className="flex flex-col items-center text-center gap-1">
                <MdLaptop className="text-4xl text-[var(--primary)]" />
                <p className="font-semibold text-md">Online anywhere</p>
                <p className="text-xs text-[var(--foreground-muted)]">Lessons from the comfort of your home</p>
              </div>
            </div>
          </div>
          <div className="w-full mx-auto max-w-[50%] sm:max-w-[420px] md:max-w-none md:w-[450px] md:h-[500px] lg:w-[580px] lg:h-[600px] aspect-[4/3]  md:aspect-auto shrink-0 overflow-hidden rounded-t-full shadow-sm bg-[var(--background-alt)]">
            <img 
              src="/homepage.jpg" 
              alt="Júlia - Catalan and Spanish Tutor" 
              className="w-full h-full object-cover object-top" 
            />
          </div>
        </div>
      </motion.header>

      {/* WHY LEARN WITH ME */}
      <main className="bg-[var(--background-main)]" >
        <motion.section className="text-center w-[92%] max-w-6xl mx-auto my-20 "
         initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity:1, y:0}}
      viewport={{ 
        once: true,    // Only animates once (doesn't repeat if you scroll up and down)
        amount: 0.3    // Triggers when 30% of the element is visible
      }}
      transition={{ duration: 0.5 }}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
            Why learn with me
          </h2>
          <h3 className="mx-auto mt-3 max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl 2xl:text-4xl">
            A clear path from first words to fluent conversation
          </h3>
          <div className="mt-10 grid grid-cols-1 gap-5 text-left sm:grid-cols-4 sm:gap-6">
            {benefits.map((item) => {
              const IconComponent = item.icon;
              return (
                <article
                  key={item.title}
                  className="group relative flex flex-col items-center text-center overflow-hidden rounded-2xl  p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg border-t-2 border-[var(--amber)] hover:border-[var(--primary)]"
                >
                  <div className="absolute inset-x-0 top-0 h-1bg-gradient-to-r from-[var(--indigo)] to-[var(--amber)] opacity-0 transition group-hover:opacity-100" />
                  <img src="/conversational.jpg"></img>
                  {/* <span className="inline-flex p-3 h-20 w-20 items-center justify-center rounded-4xl bg-[var(--indigo-muted)] text-5xl text-[var(--indigo)]">
                    <IconComponent />
                  </span> */}
                  <h4 className="mt-4 font-semibold">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--foreground-muted)]">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </motion.section>

            {/* METRICS */}
        <motion.section
          className="bg-[var(--primary)] py-10 px-6"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 items-center text-center gap-8 w-full text-[var(--surface)]">
            <div className="flex flex-row items-start justify-center gap-4">
              <MdOutlineForum className="text-6xl" />
              <div className="flex flex-col items-center justify-center">
                <Counter to={6000} duration={2.5} />
                <p className="mt-2 text-sm sm:text-base">hours taught</p>
              </div>
            </div>
            <div className="flex flex-row items-start justify-center gap-4">
              <MdOutlineLanguage className="text-6xl" />
              <div className="flex flex-col items-center justify-center">
                <Counter to={150} duration={2} />
                <p className="mt-2 text-sm sm:text-base">students from all over</p>
              </div>
            </div>
            <div className="flex flex-row items-start justify-center gap-2">
              <MdSchool className="text-6xl " />
              <div className="flex flex-col items-center justify-center">
                <Counter to={5} duration={1.5} />
                <p className="mt-2 text-sm sm:text-base">years of experience</p>
              </div>
            </div>
          </div>
        </motion.section>

          {/* HOW IT WORKS */}
        <motion.section className="section-beige mx-auto flex flex-col items-center justify-center gap-12 md:grid-cols-2 md:gap-16 py-15"
         initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity:1, y:0}}
      viewport={{ 
        once: true,    // Only animates once (doesn't repeat if you scroll up and down)
        amount: 0.3    // Triggers when 30% of the element is visible
      }}
      transition={{ duration: 0.5 }}>
          <div className="space-y-4 text-center mx-auto ">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
              How it works
            </h2>
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl 2xl:text-4xl">
              Simple steps to start learning
            </h3>
            <p className="text-sm leading-relaxed text-[var(--foreground-muted)] mx-auto w-[75%] sm:text-base lg:text-lg">
              Choose the type of lessons that matches your goals, select a plan, and schedule a time that works for
              you. We handle materials, planning and progress tracking.
            </p>
          </div>
          <div className="p-6 sm:p-8 lg:p-10">
            <Steps />
          </div>
        </motion.section>

      {/* ABOUT ME */}
        <motion.section
          className="section-white grid grid-cols-1 items-center justify-center gap-6 p-6 sm:p-8 md:grid-cols-3 md:gap-10 mx-auto w-[90%] lg:p-10"
           initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity:1, y:0}}
      viewport={{ 
        once: true,    // Only animates once (doesn't repeat if you scroll up and down)
        amount: 0.3    // Triggers when 30% of the element is visible
      }}
      transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center md:justify-end w-full">
            <img
              src="/casual-me.jpg"
              alt="Catalan tutor"
              className="relative aspect-[4/5] w-[80%] sm:w-[70%] md:w-[85%] rounded-2xl object-cover"
            />
          </div>
          <div className="space-y-4 text-left">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
              About me
            </h2>
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Hi! I am Júlia
            </h3>
            <p className="text-sm leading-relaxed text-[var(--foreground-muted)] sm:text-base">
              I have been a full time language tutor for 6 years, working with people from many different countries and backgrounds.
            </p>
            <p className="text-sm leading-relaxed text-[var(--foreground-muted)] sm:text-base">
              I specialize in creating personalized and engaging lessons to help you achieve your personal language goals!
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center text-sm font-semibold text-[var(--primary)] transition hover:text-[var(--indigo)]"
            >
              Get in touch →
            </Link>
          </div>
          <div className="relative border-l-1 border-[var(--text)] px-10 ">
            <span className="text-6xl">&ldquo;</span>
            <blockquote className="italic text-sm sm:text-base leading-relaxed text-[var(--foreground-muted)] mb-6">
              Julia is an excellent tutor. Lessons are well-structured, engaging and adapted to my needs. I feel much more confident speaking now.
            </blockquote>
            <span className="text-6xl">&rdquo;</span>
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[var(--indigo)]">
              — TOM, NEW ZEALAND
            </p>
          </div>
        </motion.section>

        {/* REVIEWS */}

        <motion.section className="section-beige p-15 space-y-4 text-center mx-auto md:pr-4"
        initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity:1, y:0}}
      viewport={{ 
        once: true,    // Only animates once (doesn't repeat if you scroll up and down)
        amount: 0.3    // Triggers when 30% of the element is visible
      }}
      transition={{ duration: 0.5 }}>
            <h2>What students say</h2>
            <h3>My Students' Experience</h3>
            <article className="grid grid-cols-1 sm:grid-cols-2 text-center gap-10">
              { reviews.map((r, index) => {
                return(
                  <div key={index} className="p-5 border-[var(--border-subtle)] border-1 bg-[var(--card-background)] rounded-md flex flex-col items-align gap-3">
                    <div className="flex justify-center text-amber-400">
                      <MdStar className="text-xl" />
                      <MdStar className="text-xl" />
                      <MdStar className="text-xl" />
                      <MdStar className="text-xl" />
                      <MdStar className="text-xl" />
                    </div>
                    <p className="italic text-sm sm:text-base leading-relaxed text-[var(--foreground-muted)]">{r.review}</p>
                    <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[var(--indigo)]"> - {r.name}, {r.language} lessons</p>
                  </div>
                )
              })}
            </article>
            <a href="https://preply.com/es/profesor/966879" target="_blank" className="mx-auto"><button className="btn-primary mt-5">See more reviews</button></a>
        </motion.section>

        <section className="section-white p-15 space-y-4 text-left mx-auto md:pr-4 flex flex-col items-center justify-center w-[90%] sm:w-[70%]">
          
            <h2>Frequently Asked Questions</h2>
            <h3>Common Questions About Lessons</h3>
            {faqs.map((faq, index) => {
              return(
                <div key={index} className="border border-1 border-[var(--border-subtle)] bg-[var(--card-background)] py-4 px-5  mb-3 rounded-sm shadow-sm w-full">
                  <button className="w-full font-bold flex justify-between items-center cursor-pointer" onClick={()=> toggleFAQ(index)}><span>{faq.question}</span><span className="text-xl">{openIndex === index ? `-`: `+`}</span></button>
                  <div className={`overflow-hidden transition-all duration-600 ease-in-out ${openIndex === index ? "max-h-20 opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}>
                    <p className="pt-2">{faq.answer}</p>
                  </div>
                </div>
              )
            })}
          
        </section>
        <CtaSection />
            
       
      </main>
    </>
  )
}
