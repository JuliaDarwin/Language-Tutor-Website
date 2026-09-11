import Stripe from "stripe";
import { auth, clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/payment");
  }

  // 1. Fetch the session securely from Stripe using the ID
  const session = await stripe.checkout.sessions.retrieve(session_id);

  // 2. Make sure the payment was actually successful
  if (session.payment_status !== "paid") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Incomplete</h1>
        <p className="text-[var(--foreground-muted)] mb-8">It looks like the payment was not completed.</p>
        <Link href="/payment" className="btn-primary">Try Again</Link>
      </div>
    );
  }

  // 3. Add the lessons to the user's balance
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  // Check if we've already processed this session to prevent double-crediting
  // In a real app with webhooks, this is handled differently, but for a simple flow:
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  
  // We read the 'lessons' metadata we just added in actions.ts!
  const lessonsBought = parseInt(session.metadata?.lessons || "0", 10);
  
  const currentUnscheduledValues = user.publicMetadata.unscheduled_lessons as number | undefined;
  const currentCount = currentUnscheduledValues ?? 0;
  
  // Update user balance!
  await client.users.updateUser(userId, {
      publicMetadata: {
          ...user.publicMetadata,
          unscheduled_lessons: currentCount + lessonsBought
      },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 mt-20">
      <div className="rounded-full bg-green-100 p-4 mb-6">
        <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">Payment Successful!</h1>
      <p className="text-[var(--foreground-muted)] text-lg mb-8 max-w-lg">
        Thank you for your purchase. {lessonsBought} lesson(s) have been added to your account balance.
      </p>
      <Link href="/dashboard" className="btn-primary">
        Go to Dashboard
      </Link>
    </div>
  );
}
