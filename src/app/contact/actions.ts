"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(formData: FormData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const weeklyLessons = formData.get("weeklyLessons");
    const lessonType = formData.get("lessonType");
    const message = formData.get("message");

    await resend.emails.send({
        from: 'Contact Form <onboarding@resend.dev>',
        to: 'juliaelguetaserra@gmail.com',
        subject: `New message from ${name}`,
        text: `Email: ${email}\n Weekly Lessons: ${weeklyLessons}\n
    Lesson Type: ${lessonType}\n\nMessage: ${message}`,
    });
}

