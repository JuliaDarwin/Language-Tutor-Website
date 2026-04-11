import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
    try {
        const payload = await req.json();
        console.log("=== WEBHOOK RECEIVED ===");
        console.log("Payload:", JSON.stringify(payload, null, 2));

        // Cal.com trigger event names
        const triggerEvent = payload.triggerEvent;
        // The booking uid
        const uid = payload.uid || payload.payload?.uid;
        
        if (triggerEvent === "BOOKING_CANCELLED") {
            const email = payload.payload?.attendees?.[0]?.email || payload.attendees?.[0]?.email;
            if (!email) {
                 console.error("Webhook Cancel Error: No email found in payload");
                 return NextResponse.json({ error: "No email found" }, { status: 400 });
            }

            const client = await clerkClient();
            const users = await client.users.getUserList({ emailAddress: [email] });
            const user = users.data[0];

            if (!user) {
                 console.error("Webhook Cancel Error: User not found in Clerk for email:", email);
                 return NextResponse.json({ error: "User not found" }, { status: 404 });
            }

            const currentBookings = (user.publicMetadata.scheduled_bookings as any[]) || [];
            
            const newBookings = currentBookings.filter(b => b.uid !== uid);
            const newDates = (user.publicMetadata.scheduled_dates as string[])?.filter(
                 d => !currentBookings.find(b => b.uid === uid && b.date === d)
            ) || [];

            const currentUnscheduled = (user.publicMetadata.unscheduled_lessons as number) || 0;
            const currentScheduled = (user.publicMetadata.scheduled_lessons as number) || 0;

            await client.users.updateUser(user.id, {
                publicMetadata: {
                    ...user.publicMetadata,
                    unscheduled_lessons: currentUnscheduled + 1,
                    scheduled_lessons: Math.max(0, currentScheduled - 1),
                    scheduled_bookings: newBookings,
                    scheduled_dates: newDates
                }
            });
            console.log("Webhook Processed: Cancellation updated successfully in Clerk.");
            revalidatePath("/dashboard");
            return NextResponse.json({ message: "Booking cancelled, credit restored" });
        }

        if (triggerEvent === "BOOKING_RESCHEDULED") {
            const email = payload.payload?.attendees?.[0]?.email || payload.attendees?.[0]?.email;
            if (!email) {
                 console.error("Webhook Reschedule Error: No email found in payload");
                 return NextResponse.json({ error: "No email found" }, { status: 400 });
            }

            const client = await clerkClient();
            const users = await client.users.getUserList({ emailAddress: [email] });
            const user = users.data[0];

            if (!user) {
                 console.error("Webhook Reschedule Error: User not found in Clerk for email:", email);
                 return NextResponse.json({ error: "User not found" }, { status: 404 });
            }

            // In reschedule, we want to update the date of the booking
            const newDate = payload.payload?.startTime || payload.startTime;

            const currentBookings = (user.publicMetadata.scheduled_bookings as any[]) || [];
            const bookingIndex = currentBookings.findIndex(b => b.uid === uid);
            
            let newBookings = [...currentBookings];
            
            if (bookingIndex !== -1) {
                newBookings[bookingIndex] = { ...newBookings[bookingIndex], date: newDate };
            } else {
                newBookings.push({ uid, date: newDate });
            }

            await client.users.updateUser(user.id, {
                publicMetadata: {
                    ...user.publicMetadata,
                    scheduled_bookings: newBookings,
                    // Keep counts the same since it's just a move
                }
            });
            console.log("Webhook Processed: Reschedule updated successfully in Clerk.");
            revalidatePath("/dashboard");
            return NextResponse.json({ message: "Booking rescheduled" });
        }

        return NextResponse.json({ message: "Event ignored" });

    } catch (error) {
        console.error("Webhook processing failed", error);
        return NextResponse.json({ error: "Webhook Error" }, { status: 500 });
    }
}
