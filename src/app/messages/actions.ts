"use server";
import prisma from "@/lib/db";
import Pusher from "pusher";
import { auth } from "@clerk/nextjs/server";

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    useTLS: true,
});

// Fetch all messages for a specific user's chat
export async function getMessages(userId: string) {
    const { userId: callerId, sessionClaims } = await auth();
    if (!callerId) throw new Error("Unauthorized");
    
    const isAdmin = sessionClaims?.metadata?.role === "admin";
    if (!isAdmin && callerId !== userId) throw new Error("Forbidden");
    return await prisma.message.findMany({
        where: { userId },
        orderBy: { createdAt: "asc" }
    });
}

// Fetch all users who have an active chat (for the Admin inbox sidebar)
export async function getChatUsers() {
    const { userId: callerId, sessionClaims } = await auth();
    const isAdmin = sessionClaims?.metadata?.role === "admin";
    if (!callerId || !isAdmin) throw new Error("Forbidden: Admins only");
    
    // Fetch unique userIds from the Message table
    const uniqueUsers = await prisma.message.findMany({
        select: { userId: true, userName: true },
        distinct: ['userId'],
    });

    return uniqueUsers.map((u: any) => ({
        userId: u.userId,
        userName: u.userName
    }));
}

// Send a message
export async function sendMessage(userId: string, userName: string, senderId: string, text: string) {
    const { userId: callerId, sessionClaims } = await auth();
    if (!callerId) throw new Error("Unauthorized");
    
    const isAdmin = sessionClaims?.metadata?.role === "admin";
    // Must be admin OR the chat owner
    if (!isAdmin && callerId !== userId) throw new Error("Forbidden: Cannot access this chat");
    // Cannot spoof senderId
    if (callerId !== senderId) throw new Error("Forbidden: Cannot spoof sender");

    // 1. Save to database
    const message = await prisma.message.create({
        data: {
            userId,
            userName,
            senderId,
            text
        }
    });

    // 2. Trigger Pusher for the specific user's chat room
    await pusher.trigger(`user-chat-${userId}`, "new-message", message);

    // 3. Trigger a general admin event so the admin's inbox can update if they are looking at a different chat
    await pusher.trigger(`admin-inbox`, "new-message", message);

    return message;
}
