"use client";

import { useEffect, useState } from "react";

export function ClientDate({ dateString }: { dateString: string }) {
  const [formatted, setFormatted] = useState<{ date: string; time: string } | null>(null);

  useEffect(() => {
    const date = new Date(dateString);
    setFormatted({
      date: date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  }, [dateString]);

  if (!formatted) {
    // Render an invisible placeholder with the same height to preserve layout
    // without triggering a hydration mismatch
    return (
      <div>
        <p className="font-medium opacity-0">Lesson</p>
        <p className="text-sm text-gray-500 opacity-0">Loading time...</p>
      </div>
    );
  }

  return (
    <div>
      <p className="font-medium">Lesson</p>
      <p className="text-sm text-gray-500">{formatted.date}, {formatted.time}</p>
    </div>
  );
}
