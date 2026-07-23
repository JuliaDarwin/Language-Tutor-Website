"use client";

import { useParams } from "next/navigation";

export default function WhyOurLessons(){

  const params = useParams();
  
  // Since the route folder is [lessonId], the parameter key is lessonId
  const lessonIdStr = params.lessonId;
  const lessonIdNum = typeof lessonIdStr === "string" ? parseInt(lessonIdStr, 10) : 1;
  
  // Convert to 0-based index and default to 0 if NaN
  const index = isNaN(lessonIdNum) ? 0 : lessonIdNum - 1;

  const reasons = [
    [
      {
        text: "We follow the official Common European Framework of Reference.",
        img: "/cefr.webp",
      },
      {
        text: "We will practice speaking on a variety of topics, from daily life topics to more advanced discussions.",
        img: "/material.jpg",
      },
      {
        text: "I am a native tutor from Barcelona with neutral accent.",
        img: "/onlinetutor.jpg",
      },
    ],
    [
      {
        text: "I follow the official Common European Framework of Reference.",
        img: "/cefr.webp",
      },
      {
        text: "We will work on all aspects of learning: speaking, listening, grammar and reading comprehension.",
        img: "/material.jpg",
      },
      {
        text: "All material will be provided and accessible online.",
        img: "/onlinetutor.jpg",
      },
    ],
    [
      {
        text: "I follow the official Common European Framework of Reference.",
        img: "/cefr.webp",
      },
      {
        text: "Our lessons will be based on the same types of exercises used in the exam.",
        img: "/material.jpg",
      },
      {
        text: "Techniques and familiarization with the exam format and requirements.",
        img: "/onlinetutor.jpg",
      },
    ],
  ];

  // Safely get the reasons for the current lesson, falling back to the first set
  const currentReasons = reasons[index] || reasons[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 w-full max-w-6xl mx-auto px-4 2xl:text-2xl">
      {currentReasons.map((reason, index) => (
        <div
          key={index}
          className="flex flex-col h-[360px] md:h-[400px] lg:h-[380px] p-3 bg-[var(--surface)] rounded-2xl hover:scale-105 transform transition-transform shadow-md"
        >
          <img src={reason.img} alt="feature" className="w-full h-[70%] object-cover rounded-xl" />
          <p className="h-[30%] flex items-center justify-center text-center p-2 text-[var(--foreground)] font-medium text-sm md:text-xs lg:text-sm xl:text-base">
            {reason.text}
          </p>
        </div>
      ))}
    </div>
  );
}