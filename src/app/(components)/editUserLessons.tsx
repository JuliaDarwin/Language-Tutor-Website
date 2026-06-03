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
        <div>
            <input type="number" value={count} onChange={handleChange}></input>
            <button onClick={handleSave}>Save changes</button>
        </div>
        
        
    )
}
