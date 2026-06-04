"use client";

import { useEffect, useState } from "react";

export function ClientDate({ dateString, lessonWith }: { dateString: string; lessonWith?: string }) {
  const [formatted, setFormatted] = useState<{ date: string; time: string } | null>(null);

  useEffect(() => {
    const date = new Date(dateString);
    setFormatted({
      date: date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })
    });
  }, [dateString]); //means run this code whenever datestrign changes

  if (!formatted) {
    // Render an invisible placeholder with the same height to preserve layout
    // without triggering a hydration mismatch
    return (
      <div>
        <p className="font-medium opacity-0">Lesson with {lessonWith}</p>
        <p className="text-sm text-gray-500 opacity-0">Loading time...</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-500">Lesson with {lessonWith}</p>
      <p className="text-md">{formatted.date}, {formatted.time}</p>
    </div>
  );
}
