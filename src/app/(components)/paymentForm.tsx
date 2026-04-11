"use client";

import { useState } from "react";
import { purchaseLessons } from "../payment/actions";

export default function PaymentForm({ initialLessons }: { initialLessons: number }) {
  //aqui diu que usestate pot ser o un numero o empty string. i dp posa com a valor inicial el num de initiallessons que rep a traves de payment, 
  //que al seu torn ho rep a traves de searchParams que ve de pricing plans. en cas que no vingui de pricing plans ho posa com ""
  const [lessons, setLessons] = useState<number | "">(initialLessons > 0 ? initialLessons : "");

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl w-full text-center border border-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Choose Your Lesson Plan</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[5, 10, 15].map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => setLessons(amount)}
            className={`py-4 rounded-xl font-semibold border-2 transition-all ${
              lessons === amount
                ? "border-[var(--blue)] bg-[var(--blue)]/10 text-[var(--blue)]"
                : "border-gray-200 hover:border-[var(--lightblue)] text-gray-700"
            }`}
          >
            {amount} Lessons
           </button>
        ))}
      </div>

      <div className="mb-8 text-left">
        <label className="block text-gray-700 font-medium mb-2">Or enter a custom amount:</label>
        <input 
          type="number" 
          min="1"
          max="15"
          value={lessons}
          onChange={(e) => {
            // Strip out any non-digit characters (prevents pasted decimals/text)
            const onlyNums = e.target.value.replace(/\D/g, "");
    
            if (onlyNums === "") {
              setLessons("");
            } else {
      // Optional: Prevent typing numbers greater than 15 right away
      const num = parseInt(onlyNums, 10);
      if (num <= 15) {
        setLessons(num);
      }
    }
  }}          className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-[var(--blue)] outline-none transition-colors"
          placeholder="e.g. 7"
        />
      </div>

      <form action={purchaseLessons}>
        <input type="hidden" name="lessons" value={lessons} />
        <button
          type="submit"
          disabled={!lessons || lessons <= 0}
          className="w-full bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold py-4 px-6 rounded-xl transition-colors shadow-sm text-lg"
        >
          {lessons && lessons > 0 ? `Purchase ${lessons} Lessons` : "Select an amount to continue"}
        </button>
      </form>
    </div>
  );
}
