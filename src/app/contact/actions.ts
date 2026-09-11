"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(formData: FormData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const weeklyLessons = formData.get("weeklyLessons");
    const lessonType = formData.get("lessonType");
    const message = formData.get("message");

    try {
        const data = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>',
            to: 'juliaelguetaserra@gmail.com',
            subject: `New message from ${name}`,
            text: `Email: ${email}\nWeekly Lessons: ${weeklyLessons}\nLesson Type: ${lessonType}\n\nMessage: ${message}`,
        });
        
        if (data.error) {
            console.error("Resend Error:", data.error);
        } else {
            console.log("Email sent successfully!", data);
        }
    } catch (error) {
        console.error("Failed to send email:", error);
    }
}

