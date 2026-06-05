"use client";

import { useState } from "react";
import Link from "next/link";
import { ClientDate } from "./clientDate";

const cardClass =
  "mx-auto w-full max-w-2xl rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 shadow-md sm:p-8";

const sectionTitleClass =
  "mb-6 pb-6 text-xl text-center font-semibold tracking-tight text-black dark:text-white";

const actionBtnClass =
  "inline-flex items-center rounded-full bg-[var(--indigo-soft)] px-4 py-2 text-sm font-semibold text-[var(--indigo)] transition hover:bg-[var(--indigo)] hover:text-white";

const toggleBtnClass =
  "mt-8 block w-full pt-2 text-center text-base font-bold text-[var(--primary)] underline underline-offset-4 transition hover:text-[var(--primary-light)]";

export default function LessonsList({
  items,
  lessonWith,
}: {
  items: any[];
  lessonWith?: string;
}) {
  const [showNextLessons, setShowNextLessons] = useState(true);

  const futureLessons = items.filter(
    (p) => new Date(p.date).getTime() - Date.now() >= 0
  );
  const pastLessons = items.filter(
    (p) => new Date(p.date).getTime() - Date.now() < 0
  );

  return showNextLessons ? (
    <div className={cardClass}>
      <h2 className={sectionTitleClass}>📅  Next lessons</h2>

      {futureLessons.length === 0 ? (
        <p className="py-6 text-center text-sm text-[var(--foreground-muted)]">
          No upcoming lessons scheduled.
        </p>
      ) : (
        <ul className="space-y-5">
          {futureLessons.map((booking, idx) => (
            <li
              key={idx}
              className="flex flex-col gap-4 border-b border-[var(--border-subtle)] pb-5 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <ClientDate
                dateString={booking.date}
                lessonWith={booking.lessonWith || lessonWith}
              />
              {new Date(booking.date).getTime() - Date.now() > 86400000 ? (
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`https://cal.com/reschedule/${booking.uid}`}
                    target="_blank"
                    className={actionBtnClass}
                  >
                    Reschedule
                  </Link>
                  <Link
                    href={`https://cal.com/cancel/${booking.uid}`}
                    target="_blank"
                    className={actionBtnClass}
                  >
                    Cancel
                  </Link>
                </div>
              ) : (
                <p className="text-sm italic text-[var(--primary)]">
                  Cancellation or rescheduling window is 24 hours.
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
      <button type="button" onClick={() => setShowNextLessons(false)} className={toggleBtnClass}>
        See past lessons
      </button>
    </div>
  ) : (
    <div className={cardClass}>
      <h2 className={sectionTitleClass}>Past lessons</h2>

      {pastLessons.length === 0 ? (
        <p className="py-6 text-center text-sm text-[var(--foreground-muted)]">
          No past lessons.
        </p>
      ) : (
        <ul className="space-y-5">
          {pastLessons.map((booking, idx) => (
            <li
              key={idx}
              className="border-b border-[var(--border-subtle)] pb-5 last:border-0 last:pb-0"
            >
              <ClientDate
                dateString={booking.date}
                lessonWith={booking.lessonWith || lessonWith}
              />
            </li>
          ))}
        </ul>
      )}
      <button type="button" onClick={() => setShowNextLessons(true)} className={toggleBtnClass}>
        See next lessons
      </button>
    </div>
  );
}
