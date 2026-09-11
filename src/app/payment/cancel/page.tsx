import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 mt-20">
      <div className="rounded-full bg-red-100 p-4 mb-6">
        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">Payment Cancelled</h1>
      <p className="text-[var(--foreground-muted)] text-lg mb-8 max-w-lg">
        You have cancelled the payment process. Your account has not been charged.
      </p>
      <Link href="/payment" className="btn-primary">
        Return to Packages
      </Link>
    </div>
  );
}
