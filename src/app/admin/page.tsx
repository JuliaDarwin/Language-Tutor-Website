import { clerkClient } from "@clerk/nextjs/server"
import { setRole } from "./actions";
import Link from "next/link"


export default async function Admin(){
    const client = await clerkClient();
    const users = (await client.users.getUserList()).data;

    return (
        <>
            {users.map((user) => {
                return (
                    <div
                        key={user.id}
                        className={`flex items-center justify-between gap-4 p-4 ${
                            users.indexOf(user) % 2 === 0
                                ? "bg-neutral-50 dark:bg-neutral-800"
                                : "bg-white dark:bg-neutral-900"
                        }`}
                    >
                        <div className="flex gap-8">
                            <div className="dark:text-neutral-200">
                                {user.firstName} {user.lastName}
                            </div>
                            <div className="dark:text-neutral-200">
                                {
                                    user.emailAddresses.find(
                                        (email) => email.id === user.primaryEmailAddressId
                                    )?.emailAddress
                                }
                            </div>

                            <div className="dark:text-neutral-200">
                                {user.publicMetadata.role as string}
                            </div>

                            <div className="dark:text-neutral-200">
                                {user.publicMetadata.scheduled_lessons as number !== 0 && user.publicMetadata.scheduled_lessons as number !== undefined ? `${user.publicMetadata.scheduled_lessons as number} scheduled lessons` : `0 scheduled lessons`}
                            </div>
                            <div className="dark:text-neutral-200">
                                {user.publicMetadata.unscheduled_lessons as number} unscheduled lessons
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <form action={setRole} className="inline">
                                <input type="hidden" value={user.id} name="id" />
                                <input type="hidden" value="admin" name="role" />
                                <button 
                                    type="submit"
                                    className="px-2 py-1 text-sm border border-neutral-300"
                                    > Make Admin
                                </button>
                            </form>

                            <form action={setRole} className="inline">
                                <input type="hidden" value={user.id} name="id" />
                                <input type="hidden" value="moderator" name="role" />
                                <button 
                                    type="submit"
                                    className="px-2 py-1 text-sm border border-neutral-300"
                                    > Make Moderator
                                </button>
                            </form>
                            <Link href={`/admin/${user.id}`} className="px-2 py-1 text-sm border border-neutral-300"> Manage User </Link>

                            {/* aqui no funcionaria perque no he fet la funcio removerole, esta al video 90 min 8
                            <form action={removeRole} className="inline">
                                <input type="hidden" value={user.id} name="id" />
                                <button 
                                    type="submit"
                                    className="px-2 py-1 text-sm border border-neutral-300"
                                    > Remove Role
                                </button>
                            </form>*/}
                        </div>
                    </div>

                    
                )
            })}
        </>
    )
}
//to protect this to be view for someone signed in + having admin role, we handle that in middleware