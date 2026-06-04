import { auth, currentUser, clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";
import EditUserLessons from "../(components)/editUserLessons";
import LessonsList from "../(components)/lessonsList";
import prisma from "@/lib/db";

//this function retrieves the scheduled bookings from the metadata
export default async function DashboardPage() {
  const authObj = await auth();
  const userObj = await currentUser();
  const isAdmin = userObj?.publicMetadata?.role === "admin";

  const userName = userObj?.firstName || "";
  const userId = userObj?.id;

  let bookings = [];
  //if its an admin, we get all the bookings, then retrieve all the clients list from clerk client, then for each booking we find the student whose id matches the userId of the booking
  // then we set the name and last name in case the student exists, otherwise "unknown". in case its admin we return a single object that contains all properties of bookings plus a new property: the studentname

  if (isAdmin) {
    // Admin (teacher) sees all lessons
    const rawBookings = await prisma.lesson.findMany({
      orderBy: { date: 'asc' }
    });

    const client = await clerkClient();
    const usersList = (await client.users.getUserList()).data;

    bookings = rawBookings.map((booking) => {
      const student = usersList.find((u) => u.id === booking.userId);
      const studentName = student ? `${student.firstName || ""} ${student.lastName || ""}`.trim()  : "Unknown Student";
      return {
        ...booking,
        lessonWith: studentName,
      };
    });
  } else {
    // Student sees only their own lessons
    bookings = await prisma.lesson.findMany({
      where: { userId: userId },
      orderBy: { date: 'asc' }
    });
  }

  const futureLessons = bookings.filter(
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
        <LessonsList items={bookings} lessonWith={isAdmin ? undefined : "Julia Darwin"}/>
        
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
              <p className="text-4xl text-bold text-[var(--blue)]">
                {userObj?.publicMetadata?.unscheduled_lessons 
                  ? Number(userObj.publicMetadata.unscheduled_lessons) 
                  : 0}
              </p>
              <p className="text-sm text-gray-400">Not yet scheduled</p>
            </div>
          </div>
        </div>
        {/*<Link href="/payment" 
                    className="inline-flex items-center rounded-full bg-amber-400 px-6 py-3 text-lg 2xl:text-3xl font-semibold text-slate-950 shadow-sm hover:bg-amber-300 transition-colors">
                    Buy Lessons</Link>*/}

        <Link href="/booking"
              className="inline-flex items-center mt-20 mx-6 rounded-full bg-amber-400 px-6 py-3 text-lg 2xl:text-3xl font-semibold text-slate-950 shadow-sm hover:bg-amber-300 transition-colors">
          Schedule Lessons
        </Link>
      </div>
    </>
  );
}
