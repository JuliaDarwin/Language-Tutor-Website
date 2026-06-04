"use server";

import prisma from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

//this function accesses the current user's data from Clerk, decreases their unscheduled_lessons count by 1, and increases their scheduled_lessons count by 1.

export async function scheduleLessonAction(dateStr?: string, uid?: string, targetUserId?: string) {
    const { userId, sessionClaims } = await auth();

    if (!userId) {
        throw new Error("Not authorized");
    }

    const client = await clerkClient();

    // Determine the subject of the booking.
    // If targetUserId is provided, verify the logged-in user is an admin.
    let activeUserId = userId;
    if (targetUserId && targetUserId !== userId) {
        if (sessionClaims?.metadata?.role !== "admin") {
            throw new Error("Not authorized to schedule lessons for other users");
        }
        activeUserId = targetUserId;
    }

    const user = await client.users.getUser(activeUserId);

    // we are telling typescript what type of data to expect, either a number or undefined. this way we avoid that if is undefined we get an error of object unknown
    const currentUnscheduled = user.publicMetadata.unscheduled_lessons as number | undefined;
    const currentScheduled = user.publicMetadata.scheduled_lessons as number | undefined;
    //const currentBookings = (user.publicMetadata.scheduled_bookings as any[]) || [];

    //now here we treat the value of the data
    const unscheduledCount = currentUnscheduled ?? 0; // remember ?? means if its null or undefined
    const scheduledCount = currentScheduled ?? 0;

    // Only decrement unscheduled if it's > 0, otherwise maybe they are just testing or something is out of sync.
    // In a real scenario you would block booking if unscheduledCount <= 0.
    const newUnscheduled = Math.max(0, unscheduledCount - 1);
    const newScheduled = scheduledCount + 1;

    try {
        if (dateStr && uid) {
            await prisma.lesson.create({
                data: {
                    userId: activeUserId,
                    date: new Date(dateStr),
                    uid: uid
                }
            })
        }
        await client.users.updateUser(activeUserId, { //update user is a clerk method to update based on the userid
            publicMetadata: {
                ...user.publicMetadata,
                unscheduled_lessons: newUnscheduled,
                scheduled_lessons: newScheduled,

            },
        });

    } catch (error) {
        console.error("Failed to update lesson counts and db:", error);
        throw new Error("Failed to process schedule update");
    }

    revalidatePath("/dashboard");
    revalidatePath(`/admin/${activeUserId}`);
}

