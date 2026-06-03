"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { Roles } from "../../../types/globals";
import { revalidatePath } from "next/cache";


export async function setRole(formData: FormData) {
    const { sessionClaims } = await auth();

    if (sessionClaims?.metadata?.role !== "admin") {
        throw new Error("Not authorized");
    }

    const client = await clerkClient();
    const id = formData.get("id") as string;
    const role = formData.get("role") as Roles;

    try {
        await client.users.updateUser(id, {
            publicMetadata: { role }, //here is just role because it will get whatever value is in the json, and we had set it to admin
        });
        revalidatePath("/admin");
    } catch {
        throw new Error("Failed to set role");
    }
}

//in about min 8 of video 90 of next js 15 tutorial,explains a function to remove a role. very similar

export default async function updateUnscheduled(userId: string, count: number) {

    const client = await clerkClient();

    try {
        const user = await client.users.getUser(userId);
        await client.users.updateUser(userId, {
            publicMetadata: {
                ...user.publicMetadata,
                unscheduled_lessons: count
            }
        })

        revalidatePath(`/admin/${userId}`);
    } catch (e) {
        throw new Error("Failed to update lessons");
    }

}