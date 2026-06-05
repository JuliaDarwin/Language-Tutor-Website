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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 2xl:gap-20 justify-center mt-8 w-[70%] sm:w-[90%] 2xl:w-[80%] 2xl:text-2xl mx-auto">
      {currentReasons.map((reason, index) => (
        <div
          key={index}
          className="flex flex-col p-2 bg-[var(--surface)] rounded-2xl hover:scale-105 transform transition-transform"
        >
          <img src={reason.img} alt="feature" className="w-full h-1/2" />
          <p className="flex-1 flex items-center justify-center text-center p-3 text-[var(--foreground)">
            {reason.text}
          </p>
        </div>
      ))}
    </div>
  );
}