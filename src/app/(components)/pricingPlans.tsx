"use client";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function PricingPlans() {
  const plans = [
    {
      name: "Slow pace",
      price: "$150",
      features: ["5 lessons"],
      lessons: 5,
      highlighted: false,
    },
    {
      name: "Commitment",
      price: "$300",
      features: ["10 lessons"],
      lessons: 10,
      highlighted: true,
    },
    {
      name: "Intensive",
      price: "$450",
      features: ["15 lessons"],
      lessons: 15,
      highlighted: false,
    },
  ];

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 2xl:gap-20 justify-center mt-8 w-[70%] sm:w-[90%] 2xl:w-[80%] 2xl:text-2xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl shadow-lg p-8 bg-white flex flex-col justify-between transition transform hover:-translate-y-2 ${
              plan.highlighted
                ? "border-2 border-[var(--lightblue)] scale-105"
                : "border border-gray-200"
            }`}
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                {plan.name}
              </h3>
              <p className="text-4xl font-extrabold mb-6 text-gray-900">
                {plan.price}
                <span className="text-lg font-medium text-gray-500">
                  /month
                </span>
              </p>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-gray-600">
                    • {feature}
                  </li>
                ))}
              </ul>
            </div>
                {/*if user is signed out, when clicking choose plan it will redirect to sign in*/}
            <SignedOut>
              <SignInButton mode="modal" forceRedirectUrl="/auth-callback">
                <button
                  className={`w-full py-3 rounded-xl font-semibold transition ${
                    plan.highlighted
                      ? "bg-[var(--blue)] text-white hover:bg-[var(--lightblue)] hover:text-black"
                      : "bg-[var(--lightblue)]/20 text-black hover:bg-[var(--blue)]/80 hover:text-white"
                  }`}
                >
                  Choose Plan
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              {/* aqui creem un link dinamic, tot el que va dp de "?" és info extra, llavors es, link a /payment
              + passar el parametre lessons = whatever*/}
              <Link href={`/payment?lessons=${plan.lessons}`} className="w-full block">
                <button
                  className={`w-full py-3 rounded-xl font-semibold transition ${
                    plan.highlighted
                      ? "bg-[var(--blue)] text-white hover:bg-[var(--lightblue)] hover:text-black"
                      : "bg-[var(--lightblue)]/20 text-black hover:bg-[var(--blue)]/80 hover:text-white"
                  }`}
                >
                  Choose Plan
                </button>
              </Link>
            </SignedIn>
          </div>
        ))}
      </div>
    
  );
}
