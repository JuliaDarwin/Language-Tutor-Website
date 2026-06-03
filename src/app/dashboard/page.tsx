import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import EditUserLessons from "../(components)/editUserLessons";
import LessonsList from "../(components)/lessonsList";
import prisma from "@/lib/db";


//this function retrieves the scheduled bookings from the metadata
export default async function DashboardPage() {
  const authObj = await auth();
  const userObj = await currentUser();

  console.log(authObj, userObj);

  const userName = userObj?.firstName;
  const userId = userObj?.id;

  //const bookings = (userObj?.publicMetadata?.scheduled_bookings as any[]) || [];
  const bookings= await prisma.lesson.findMany({
  where: { userId: userId },
  orderBy: { date: 'asc' }
});

  // Start with all our fully tracked bookings and sort them by date
  //const items = [...bookings].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const futureLessons =  bookings.filter(
    (p) => new Date(p.date).getTime() - Date.now() >= 0
  );
  const futureLessonsCount = futureLessons.length;
  const pastLessons = bookings.filter(
    (p) => new Date(p.date).getTime() - Date.now() < 0
  );
  const pastLessonsCount = pastLessons.length;

  return (
    <>
      <h1>Welcome back, {userName}</h1>
      <div className="text-center">
        <LessonsList items={bookings} />
        
        {/*balance*/}
        <div className="max-w-xl mx-auto mt-10 p-5 bg-gray-100 text-black rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Your Balance</h2>

          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="font-medium">Scheduled Lessons</p>
              <p className="text-4xl text-bold text-[var(--blue)]">{futureLessonsCount}</p>
              <p className="text-sm text-gray-400">Lessons booked</p>
            </div>

            <div className="text-center">
              <p className="font-medium">Past Lessons</p>
              <p className="text-4xl text-bold text-[var(--blue)]">{pastLessonsCount}</p>
              <p className="text-sm text-gray-400">Lessons completed</p>
            </div>

            <div className="text-center">
              <p className="font-medium">Unscheduled Lessons</p>
              <p className="text-4xl text-bold text-[var(--blue)]">{userObj?.publicMetadata?.unscheduled_lessons ? Number(userObj.publicMetadata.unscheduled_lessons) : 0}</p>
              <p className="text-sm text-gray-400">Not yet scheduled</p>
            </div>
          </div>
        </div>
        {/*<Link href="/payment" 
                    className="inline-flex items-center rounded-full bg-amber-400 px-6 py-3 text-lg 2xl:text-3xl font-semibold text-slate-950 shadow-sm hover:bg-amber-300 transition-colors">
                    Buy Lessons</Link>*/}

        <Link href="/booking"
                    className="inline-flex items-center mt-20 mx-6 rounded-full bg-amber-400 px-6 py-3 text-lg 2xl:text-3xl font-semibold text-slate-950 shadow-sm hover:bg-amber-300 transition-colors">
                    Schedule Lessons</Link>
      </div>
    </>
  );
}
