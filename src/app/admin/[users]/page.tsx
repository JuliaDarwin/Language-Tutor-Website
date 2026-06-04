
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
        <div>
            <h1>User Management</h1>
            <div className ="flex flex-col gap-8 items-center justify-center">
                <h2>{userName} {user.lastName}</h2>
                <p className="font-bold">Email of the user: <span className="font-normal ml-5">{userEmail}</span></p>
                    <h3 className="font-bold text-lg mb-5"> <EditUserLessons userId={user.id} initialCount={unscheduled_lessons}></EditUserLessons>unscheduled lessons</h3>

                <LessonsList items={bookings} lessonWith={`${user.firstName} ${user.lastName}`}/>
            <Link href={`/booking?userId=${userId}&userName=${userName}&userEmail=${userEmail}`}
                    className="inline-flex items-center mt-20 mx-6 rounded-full bg-amber-400 px-6 py-3 text-lg 2xl:text-3xl font-semibold text-slate-950 shadow-sm hover:bg-amber-300 transition-colors">
                    Schedule Lessons</Link>
            <Link href="/admin" className="underline italic hover:bold">Back to users list</Link>
            </div>
        </div>
    )
    
}
    