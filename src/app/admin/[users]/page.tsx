
import { clerkClient } from "@clerk/nextjs/server"
import { notFound } from "next/navigation";
import { ClientDate } from "../../(components)/clientDate";     
import Link from "next/link";
import LessonsList from "@/app/(components)/lessonsList";
import EditUserLessons from "@/app/(components)/editUserLessons";
import prisma from "@/lib/db";

 
export default async function UserManagement({
  params,
}: {
  params: Promise<{ users: string }>;
}){
    const client = await clerkClient();
    const usersList = (await client.users.getUserList()).data;
    const { users } = await params;

    const user = usersList.find((u) => u.id === users);
    const userId = user?.id;
    const userName = user?.firstName || undefined;
    const userLastName = user?.lastName || undefined;
    const userEmail = user?.emailAddresses.find((email) => email.id === user.primaryEmailAddressId)?.emailAddress;
    const unscheduled_lessons = user?.publicMetadata.unscheduled_lessons as number || 0;
    
    const bookings= await prisma.lesson.findMany({
  where: { userId: userId },
  orderBy: { date: 'asc' }
});

    
    if (!user) {
        notFound();
    }
    return (
        <div className="mx-auto w-[92%] max-w-4xl py-12 sm:py-16 text-[var(--foreground)]">
            <h1 className="text-3xl font-bold tracking-tight text-center sm:text-left">User Management</h1>
            <div className ="flex flex-col gap-8 items-center justify-center">
                <h2 className="text-2xl font-semibold text-[var(--indigo)]">{userName} {userLastName}</h2>
                <p className="font-bold">Email of the user: <span className="font-normal ml-5 text-[var(--foreground-muted)]">{userEmail}</span></p>
                    <h3 className="font-bold text-lg mb-5 text-[var(--foreground)]"> <EditUserLessons userId={user.id} initialCount={unscheduled_lessons}></EditUserLessons>unscheduled lessons</h3>

                <LessonsList items={bookings} lessonWith={`${userName} ${userLastName}`}/>
            <Link href={`/booking?userId=${userId}&userName=${userName}&userEmail=${userEmail}`}
                    className="inline-flex items-center mt-20 mx-6 rounded-full bg-[var(--amber)] px-6 py-3 text-lg 2xl:text-3xl font-semibold text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-300 transition-colors">
                    Schedule Lessons</Link>
            <Link href="/admin" className="underline italic text-[var(--primary)] hover:text-[var(--primary-light)]">Back to users list</Link>
            </div>
        </div>
    )
    
}
    
