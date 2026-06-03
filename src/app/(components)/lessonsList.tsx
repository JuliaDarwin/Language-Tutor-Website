"use client";

import { useState } from "react";
import Link from "next/link";
import { ClientDate } from "./clientDate";

export default function LessonsList({ items }: { items: any[] }) {
  const [showNextLessons, setShowNextLessons] = useState(true);

  const handleLessons = () => {
    setShowNextLessons(!showNextLessons);
  };

  const futureLessons = items.filter(
    (p) => new Date(p.date).getTime() - Date.now() >= 0
  );
  const pastLessons = items.filter(
    (p) => new Date(p.date).getTime() - Date.now() < 0
  );

  return (
    <>
      {showNextLessons ? (
        <div className="max-w-xl mx-auto mt-10 p-5 bg-gray-100 text-black rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">📅 Next Lessons</h2>

          {futureLessons.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              No upcoming lessons scheduled.
            </div>
          ) : (
            futureLessons.map((booking, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between mb-3 gap-8 border-gray-200 pb-5 last:border-0 last:pb-0"
              >
                <ClientDate dateString={booking.date} />
                {new Date(booking.date).getTime() - Date.now() > 86400000 ? (
                  <div className="flex gap-2">
                    <Link
                      href={`https://cal.com/reschedule/${booking.uid}`}
                      target="_blank"
                      className="bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-lg text-sm flex items-center"
                    >
                      Reschedule
                    </Link>
                    <Link
                      href={`https://cal.com/cancel/${booking.uid}`}
                      target="_blank"
                      className="bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-lg text-sm flex items-center"
                    >
                      Cancel
                    </Link>
                  </div>
                ) : (
                  <div>
                    <p className="text-red-400 italic text-sm">
                      Cancellation or rescheduling window is 24hours.
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
          <button onClick={handleLessons} className="mt-4 underline italic hover:font-bold">
            See past lessons
          </button>
        </div>
      ) : (
        <div className="max-w-xl mx-auto mt-10 p-5 bg-gray-100 text-black rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">📅 Past Lessons</h2>

          {pastLessons.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              No past lessons.
            </div>
          ) : (
            pastLessons.map((booking, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center mb-3 gap-8 border-gray-200 pb-5 last:border-0 last:pb-0"
              >
                <ClientDate dateString={booking.date} />
              </div>
            ))
          )}
          <button onClick={handleLessons} className="mt-4 underline italic hover:font-bold">
            See next lessons
          </button>
        </div>
      )}
    </>
  );
}
