"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, Suspense } from "react";
import { useUser } from "@clerk/nextjs";
import { scheduleLessonAction } from "./actions";
import { useRouter, useSearchParams } from "next/navigation";

/*this function uses use effect to, when react mounts, it gets the cal api and uses the cal fuinction to havea n add event listener for
when the booking is successful. the callback is the function schedulelessonaction, with parameters previously extracted from the <e className="detail data"
which is an object that cal api gives*/
function BookingContent() {
  const { user, isLoaded } = useUser(); //s a React hook provided by Clerk (the authentication provider this app uses).It is used on the client side to retrieve the authentication state and the details of the currently logged-in user.
  const router = useRouter();
  const searchParams = useSearchParams();

  // Retrieve params if they exist (when booked from the admin side)
  const targetUserId = searchParams.get("userId") || undefined;
  const targetUserName = searchParams.get("userName") || undefined;
  const targetUserEmail = searchParams.get("userEmail") || undefined;

  useEffect(() => {
    let isSubscribed = true;
    (async function () {
      const cal = await getCalApi({}); 
      cal("ui", { styles: { branding: { brandColor: "#000000" } }, hideEventTypeDetails: false, layout: "month_view" });
      
      cal("on", {
        action: "bookingSuccessful", 
        callback: async (e: any) => { 
          // e.detail.data contains the booking info from cal.com
          if (!isSubscribed) return; // prevents duplicate execution if react re renders, important in react strict mode
          
          try {
            console.log("Cal.com Booking Output:", e.detail.data);
            const dateStr = e.detail.data.date || e.detail.data.startTime;
            const uid = e.detail.data.uid || e.detail.data.booking?.uid || e.detail.data.bookingId;
            await scheduleLessonAction(dateStr, uid, targetUserId);
            router.push("/dashboard");
          } catch (error) {
            console.error("Failed to update schedule status:", error);
          }
        }
      });
    })(); 
    
    return () => {
      isSubscribed = false;
    };
  }, [targetUserId, router]); //Including targetUserId ensures the callback always has access to the most up-to-date user ID.

  if (!isLoaded) {
    return <div className="min-h-[calc(100vh-4rem)] bg-white flex justify-center items-center font-semibold text-slate-500">Loading...</div>;
  }

  // Prepopulate using target user's details if booking from admin side, otherwise fall back to logged-in user
  const displayName = targetUserName || user?.fullName || user?.firstName || "";
  const displayEmail = targetUserEmail || user?.primaryEmailAddress?.emailAddress || "";

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
          config={{ name: displayName, email: displayEmail }}
        />
      </main>
    </div>
  );
}

export default function Booking() {
  return (
    <Suspense fallback={<div className="min-h-[calc(100vh-4rem)] bg-white flex justify-center items-center font-semibold text-slate-500">Loading booking page...</div>}>
      <BookingContent />
    </Suspense>
  );
}