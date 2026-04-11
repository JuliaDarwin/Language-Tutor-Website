import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
//this function 
export default async function DashboardPage() {
  const authObj = await auth();
  const userObj = await currentUser();

  console.log(authObj, userObj);

  const userName = userObj?.firstName;

  return (
    <>
      <h1>Welcome back, {userName}</h1>
      <div className="text-center">
        <div className="max-w-md mx-auto mt-10 p-5 bg-gray-100 text-black rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">📅 Next Lessons</h2>

          {(() => {
             const dates = (userObj?.publicMetadata?.scheduled_dates as string[]) || [];
             const bookings = (userObj?.publicMetadata?.scheduled_bookings as any[]) || [];
             
             // Prefer bookings if available, else map old dates to booking-like objects for rendering
             // In a mixed scenario, merge them carefully by ensuring uniqueness, but for now we prioritize bookings if present.
             const items = bookings.length >= dates.length ? bookings : dates.map((d, i) => bookings.find(b => b.date === d) || { date: d, uid: null });

             if (items.length === 0) {
               return (
                 <div className="text-center text-gray-500 py-4">
                   No upcoming lessons scheduled.
                 </div>
               );
             }

             return items.map((booking, idx) => {
               const date = new Date(booking.date);
               const formattedDate = date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
               const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

               return (
                  <div key={idx} className="flex items-center justify-between mb-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">Lesson</p>
                      <p className="text-sm text-gray-500">{formattedDate}, {formattedTime}</p>
                    </div>

                    <div className="flex gap-2">
                      {booking.uid ? (
                        <>
                          <Link href={`https://cal.com/reschedule/${booking.uid}`} target="_blank" className="bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-lg text-sm flex items-center">
                            Reschedule
                          </Link>
                          <Link href={`https://cal.com/cancel/${booking.uid}`} target="_blank" className="bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-lg text-sm flex items-center">
                            Cancel
                          </Link>
                        </>
                      ) : (
                        <span className="text-xs text-gray-400 italic flex items-center">Legacy booking</span>
                      )}
                    </div>
                  </div>
               )
             });
          })()}
        </div>
        {/*balance*/}
        <div className="max-w-md mx-auto mt-10 p-5 bg-gray-100 text-black rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Your Balance</h2>

          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="font-medium">Scheduled Lessons</p>
              <p className="text-4xl text-bold text-[var(--blue)]">{userObj?.publicMetadata?.scheduled_lessons ? Number(userObj.publicMetadata.scheduled_lessons) : 0}</p>
              <p className="text-sm text-gray-400">Lessons booked</p>
            </div>

            <div className="text-center">
              <p className="font-medium">Unscheduled Lessons</p>
              <p className="text-4xl text-bold text-[var(--blue)]">{userObj?.publicMetadata?.unscheduled_lessons ? Number(userObj.publicMetadata.unscheduled_lessons) : 0}</p>
              <p className="text-sm text-gray-400">Not yet scheduled</p>
            </div>
          </div>
        </div>
        <Link href="/payment" 
                    className="inline-flex items-center rounded-full bg-amber-400 px-6 py-3 text-lg 2xl:text-3xl font-semibold text-slate-950 shadow-sm hover:bg-amber-300 transition-colors">
                    Buy Lessons</Link>

        <Link href="/booking"
                    className="inline-flex items-center mt-20 mx-6 rounded-full bg-amber-400 px-6 py-3 text-lg 2xl:text-3xl font-semibold text-slate-950 shadow-sm hover:bg-amber-300 transition-colors">
                    Schedule Lessons</Link>
      </div>
    </>
  );
}
