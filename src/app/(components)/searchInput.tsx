"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get("query") || "");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setInputValue(term);
    
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    
    // Updates the URL without reloading the page
    router.replace(`/admin?${params.toString()}`);
  };

  // Sync state if URL changes (e.g. from back button), then takes the word out of the url and forces it into the box
  useEffect(() => {
    setInputValue(searchParams.get("query") || "");
  }, [searchParams]);

  return (
    <div className="mb-8 flex flex-col gap-2">
      <label htmlFor="search" className="text-sm font-medium text-[var(--foreground)]">
        Search user:
      </label>
      <input
        type="text"
        id="search"
        value={inputValue}
        onChange={handleSearch}
        placeholder="Type name or email to search..."
        className="w-full sm:w-1/2 appearance-none rounded-xl border border-[var(--border-subtle)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] shadow-sm transition placeholder:text-[var(--foreground-muted)] focus:border-[var(--indigo)] focus:outline-none focus:ring-2 focus:ring-[var(--indigo)]/20"
      />
    </div>
  );
}