
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
    const userId = user?.id
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
                <h2>{user.firstName} {user.lastName}</h2>
                <p className="font-bold">Email of the user: <span className="font-normal ml-5">{user.emailAddresses.find((email) => email.id === user.primaryEmailAddressId)?.emailAddress}</span></p>
                    <h3 className="font-bold text-lg mb-5"> <EditUserLessons userId={user.id} initialCount={unscheduled_lessons}></EditUserLessons>unscheduled lessons</h3>

                <LessonsList items={bookings}/>
                {/*<div className="flex flex-col gap-2 justify-center items-center">
                    <ol>
                        {futureLessons.map((lesson, index) => (
                            <li className="flex gap-5" key={index}><ClientDate dateString={new Date(lesson.date).toISOString()}/>
                            <button>
                                <Link href={`https://cal.com/reschedule/${lesson.uid}`} target="_blank" className="bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-lg text-sm flex items-center">
                                    Reschedule
                                </Link>
                            </button>
                            <button>
                                <Link href={`https://cal.com/cancel/${lesson.uid}`} target="_blank" className="bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-lg text-sm flex items-center">
                                    Cancel
                                </Link>
                            </button>
                            </li>
                        ))}
                    </ol>
                </div>*/}
            <Link href="/admin" className="underline italic hover:bold">Back to users list</Link>
            </div>
        </div>
    )
    
}
    