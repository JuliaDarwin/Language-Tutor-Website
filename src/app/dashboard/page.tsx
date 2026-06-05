import { currentUser, clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";
import LessonsList from "../(components)/lessonsList";
import prisma from "@/lib/db";

export default async function DashboardPage() {
  const userObj = await currentUser();
  const isAdmin = userObj?.publicMetadata?.role === "admin";
  const unscheduled_lessons =
    (userObj?.publicMetadata.unscheduled_lessons as number) || 0;
  let enoughCredit = true;
  if (unscheduled_lessons <= 0) {
    enoughCredit = false;
  }

  const userName = userObj?.firstName || "";
  const userId = userObj?.id;

  let bookings = [];

  if (isAdmin) {
    const rawBookings = await prisma.lesson.findMany({
      orderBy: { date: "asc" },
    });

    const client = await clerkClient();
    const usersList = (await client.users.getUserList()).data;

    bookings = rawBookings.map((booking) => {
      const student = usersList.find((u) => u.id === booking.userId);
      const studentName = student
        ? `${student.firstName || ""} ${student.lastName || ""}`.trim()
        : "Unknown Student";
      return {
        ...booking,
        lessonWith: studentName,
      };
    });
  } else {
    bookings = await prisma.lesson.findMany({
      where: { userId: userId },
      orderBy: { date: "asc" },
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
    <main className="mx-auto w-[92%] max-w-4xl px-0 py-12 sm:py-16">
      <header className="mb-10 text-center sm:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
          {isAdmin ? "Admin dashboard" : "My lessons"}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
          Welcome back{userName ? `, ${userName}` : ""}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--foreground-muted)] sm:text-base">
          {isAdmin
            ? "View and manage all scheduled lessons."
            : "Track your upcoming lessons, balance, and schedule new sessions."}
        </p>
      </header>

      <div className="space-y-8">
      <section className="mx-auto w-full max-w-2xl rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 shadow-md sm:p-8">
          <h2 className="!mt-0 mb-6 text-center text-xl font-semibold tracking-tight text-black dark:text-white">
          👩🏻‍🏫 Your balance
          </h2>

          <div className="flex w-full flex-row items-start justify-between gap-6 sm:gap-8">
            <div className="min-w-0 flex-1 text-center">
              <p className="text-sm font-medium text-[var(--foreground)]">
                Scheduled lessons
              </p>
              <p className="mt-1 text-4xl font-bold text-[var(--indigo)]">
                {futureLessonsCount}
              </p>
              <p className="text-sm text-[var(--foreground-muted)]">Lessons booked</p>
            </div>

            <div className="min-w-0 flex-1 text-center">
              <p className="text-sm font-medium text-[var(--foreground)]">
                Past lessons
              </p>
              <p className="mt-1 text-4xl font-bold text-[var(--indigo)]">
                {pastLessonsCount}
              </p>
              <p className="text-sm text-[var(--foreground-muted)]">Lessons completed</p>
            </div>

            {!isAdmin && (
              <div className="min-w-0 flex-1 text-center">
                <p className="text-sm font-medium text-[var(--foreground)]">
                  Unscheduled lessons
                </p>
                <p className="mt-1 text-4xl font-bold text-[var(--indigo)]">
                  {userObj?.publicMetadata?.unscheduled_lessons
                    ? Number(userObj.publicMetadata.unscheduled_lessons)
                    : 0}
                </p>
                <p className="text-sm text-[var(--foreground-muted)]">Not yet scheduled</p>
              </div>
            )}
          </div>
        </section>
        <LessonsList
          items={bookings}
          lessonWith={isAdmin ? undefined : "Julia"}
        />

      

        <div className="flex justify-center pb-8">
          {enoughCredit ? (
            <Link
              href="/booking"
              className="inline-flex items-center rounded-full bg-[var(--amber)] px-7 py-3.5 text-base font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300 sm:text-lg"
            >
              Schedule lessons
            </Link>
          ) : (
            <span className="inline-flex cursor-not-allowed items-center rounded-full bg-[var(--border-subtle)] px-7 py-3.5 text-base font-semibold text-[var(--foreground-muted)] dark:text-white sm:text-lg">
              Not enough credit to schedule lessons
            </span>
          )}
        </div>
      </div>
    </main>
  );
}
