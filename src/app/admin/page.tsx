import { clerkClient } from "@clerk/nextjs/server";
import { removeRole, setRole } from "./actions";
import Link from "next/link";
import SearchInput from "../(components)/searchInput";

const btnOutline =
  "px-2 py-1 text-sm rounded-full border border-[var(--border-subtle)] font-medium text-[var(--indigo)] transition hover:border-[var(--indigo)] hover:bg-[var(--indigo-soft)]";

export default async function Admin({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
    const client = await clerkClient();
    const users = (await client.users.getUserList()).data;
    
    const resolvedParams = await searchParams;
    const query = (resolvedParams?.query || "").toLowerCase();

    const filteredUsers = users.filter((user) => {
        const firstName = (user.firstName || "").toLowerCase();
        const lastName = (user.lastName || "").toLowerCase();
        const email = user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress?.toLowerCase() || "";
        
        return firstName.includes(query) || lastName.includes(query) || email.includes(query);
    });

    return (
        <main className="mx-auto w-[92%] max-w-5xl py-12 sm:py-16">
            <SearchInput />
            
            {filteredUsers.length === 0 ? (
                <p className="mt-8 text-center text-[var(--foreground-muted)]">No users found matching "{query}".</p>
            ) : (
                <div className="space-y-4">
                    {filteredUsers.map((user, index) => {
                        return (
                            <div
                                key={user.id}
                                className={`flex items-center justify-between gap-4 p-4 rounded-xl ${
                                    index % 2 === 0
                                        ? "bg-[var(--surface)]"
                                        : "bg-[var(--background)]"
                                }`}
                            >
                        
                        <div className="flex gap-8 text-[var(--foreground)] pt-5">
                            <div>
                                {user.firstName} {user.lastName}
                            </div>
                            <div>
                                {
                                    user.emailAddresses.find(
                                        (email) => email.id === user.primaryEmailAddressId
                                    )?.emailAddress
                                }
                            </div>

                            <div>
                                {user.publicMetadata.role as string}
                            </div>

                            <div>
                                {user.publicMetadata.scheduled_lessons as number !== 0 && user.publicMetadata.scheduled_lessons as number !== undefined ? `${user.publicMetadata.scheduled_lessons as number} scheduled lessons` : `0 scheduled lessons`}
                            </div>
                            <div className="text-[var(--primary)]">
                                {user.publicMetadata.unscheduled_lessons as number} unscheduled lessons
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <form action={setRole} className="inline">
                                <input type="hidden" value={user.id} name="id" />
                                <input type="hidden" value="admin" name="role" />
                                <button 
                                    type="submit"
                                    className={btnOutline}
                                    > Make Admin
                                </button>
                            </form>
                            <form action={removeRole} className="inline">
                                <input type="hidden" value={user.id} name="id" />
                                <button 
                                    type="submit"
                                    className={btnOutline}
                                    > Remove Role
                                </button>
                            </form>
                            <Link href={`/admin/${user.id}`} className={btnOutline}> Manage User </Link>

                            
                        </div>
                    </div>
                        );
                    })}
                </div>
            )}
        </main>
    );
}
//to protect this to be view for someone signed in + having admin role, we handle that in middleware
