"use client";
import React from "react";
import { useState } from "react";
import updateUnscheduled from "../admin/actions";

export default function EditUserLessons({userId, initialCount}: {userId: string, initialCount: number}){

    const [count, setCount] = useState(initialCount)

    const handleChange= (e: React.ChangeEvent<HTMLInputElement>) => {
        setCount(Number(e.target.value))
    }

    const handleSave = () => {
        updateUnscheduled(userId, count)
    }

    return (
        <div className="inline-flex items-center gap-2">
            <input type="number" value={count} onChange={handleChange} className="w-20 rounded-lg border border-[var(--border-subtle)] bg-[var(--background)] px-2 py-1 text-center text-[var(--foreground)]"></input>
            <button onClick={handleSave} className="rounded-full bg-[var(--indigo-soft)] px-3 py-1 text-sm font-medium text-[var(--indigo)] hover:bg-[var(--indigo)] hover:text-white">Save changes</button>
        </div>
        
        
    )
}
