"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { scheduleLessonAction } from "./actions";

export default function Booking() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    let isSubscribed = true;
    (async function () {
      const cal = await getCalApi({}); 
      cal("ui", { styles: { branding: { brandColor: "#000000" } }, hideEventTypeDetails: false, layout: "month_view" });
      
      cal("on", {
        action: "bookingSuccessful", 
        callback: async (e: any) => { 
          // React Strict Mode workaround: if unmounted, don't trigger the action.
          // Note: cal("on") stacks listeners, so in a real app you'd want to use cal("off") in cleanup,
          // but if Cal embed doesn't support off, we guard against duplicate executions manually.
          if (!isSubscribed) return;
          
          try {
            console.log("Cal.com Booking Output:", e.detail.data);
            const dateStr = e.detail.data.date || e.detail.data.startTime;
            const uid = e.detail.data.uid || e.detail.data.booking?.uid || e.detail.data.bookingId;
            await scheduleLessonAction(dateStr, uid);
          } catch (error) {
            console.error("Failed to update schedule status:", error);
          }
        }
      });
    })();
    
    return () => {
      isSubscribed = false;
    };
  }, []);

  if (!isLoaded) {
    return <div className="min-h-[calc(100vh-4rem)] bg-white flex justify-center items-center font-semibold text-slate-500">Loading...</div>;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white flex flex-col">
      <header className="py-16 text-center text-slate-900 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--blue)]">
          Schedule Your Lesson
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Choose a time that works best for you from the calendar below.
        </p>
      </header>
      
      <main className="flex-grow w-full max-w-5xl mx-auto pb-12 px-4 shadow-sm rounded-xl mb-12">
        <Cal 
          calLink="julia-es-darwin-bdo7wm/50min" 
          style={{ width: "100%", height: "100%", overflow: "scroll" }}
          config={{ name: user?.fullName || user?.firstName || "", email: user?.primaryEmailAddress?.emailAddress || "" }}
        />
      </main>
    </div>
  );
}