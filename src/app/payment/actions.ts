"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function purchaseLessons(formData: FormData) {
    const { userId } = await auth();
    
    // 1- check if user exists
    if (!userId) {
        throw new Error("Not authorized");
    }

    // 2- get the input from the form
    const lessonsToBuyStr = formData.get("lessons") as string;
    const lessonsToBuy = parseInt(lessonsToBuyStr, 10);

    // 3- validate the number
    if (isNaN(lessonsToBuy) || lessonsToBuy <= 0 || !Number.isInteger(lessonsToBuy)) {
        throw new Error("Invalid lessons amount");
    }

    // 4- Calculate price in cents ($36 for 1-4 lessons, $35 for 5+ lessons)
    const unitPrice = lessonsToBuy >= 5 ? 3500 : 3600;

    let sessionUrl = "";

    try {
        // 5- Create a Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd', // feel free to change to 'eur'
                        product_data: {
                            name: `${lessonsToBuy} Language Lessons`,
                        },
                        unit_amount: unitPrice,
                    },
                    quantity: lessonsToBuy,
                },
            ],
            mode: 'payment',
            // We pass the userId in client_reference_id so we know who paid later
            client_reference_id: userId,
            // Pass the number of lessons in metadata so we can read it on success
            metadata: {
                lessons: lessonsToBuy.toString(),
            },
            // Stripe will redirect here after success or cancel
            success_url: `http://localhost:3000/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:3000/payment/cancel`,
        });

        if (session.url) {
            sessionUrl = session.url;
        }
    } catch (error) {
        console.error("Stripe Checkout Error:", error);
        throw new Error("Failed to process payment session");
    }

    // 6- Redirect the user to the Stripe payment page 
    // (Must be outside the try/catch block in Next.js!)
    if (sessionUrl) {
        redirect(sessionUrl);
    }
}
