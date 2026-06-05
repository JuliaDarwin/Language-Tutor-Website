"use client";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import {
  FeaturedCardShell,
  cardBodyTextClass,
  cardCheckClass,
  cardPriceClass,
  cardPriceMutedClass,
  cardTitleClass,
  featuredCardInner,
  popularBadgeClass,
  standardCardInner,
} from "./featuredCardShell";

const planButtonClass = (highlighted: boolean) =>
  `w-full rounded-full py-3 text-sm font-semibold transition ${
    highlighted
      ? "bg-[var(--amber)] text-slate-950 hover:bg-amber-300"
      : "bg-[var(--indigo-soft)] text-[var(--indigo)] hover:bg-[var(--indigo)] hover:text-white"
  }`;

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
    <div className="mx-auto mt-10 grid w-full max-w-5xl grid-cols-1 items-stretch justify-center gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:items-center 2xl:gap-10">
      {plans.map((plan) => (
        <FeaturedCardShell key={plan.name} highlighted={plan.highlighted}>
          <article className={plan.highlighted ? featuredCardInner : standardCardInner}>
            {plan.highlighted && (
              <span className={popularBadgeClass}>Popular</span>
            )}
            <div>
              <h3 className={cardTitleClass(plan.highlighted)}>{plan.name}</h3>
              <p className={cardPriceClass(plan.highlighted)}>
                {plan.price}
                <span
                  className={`text-base font-medium ${cardPriceMutedClass(plan.highlighted)}`}
                >
                  /month
                </span>
              </p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className={`flex items-center gap-2 text-sm ${cardBodyTextClass(plan.highlighted)}`}
                  >
                    <span className={cardCheckClass(plan.highlighted)} aria-hidden>
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <SignedOut>
              <SignInButton mode="modal" forceRedirectUrl="/auth-callback">
                <button className={`mt-8 ${planButtonClass(plan.highlighted)}`}>
                  Choose plan
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href={`/payment?lessons=${plan.lessons}`} className="mt-8 block w-full">
                <button className={planButtonClass(plan.highlighted)}>Choose plan</button>
              </Link>
            </SignedIn>
          </article>
        </FeaturedCardShell>
      ))}
    </div>
  );
}
