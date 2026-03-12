"use client";

import React from "react";

const message = ["Lessons", "Contact info", "Summary"];

function ProgressBar({ step }: { step: number }) {
    return(
        <div className="bg-white overflow-hidden mt-10">
            <div className="w-full flex justify-between items-center">
                <div className="w-full progress flex justify-between items-center gap-8">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"}`}>1</div>
                    <div className={`flex-1 h-1
                  ${step >= 2 ? "bg-[var(--blue)]" : "bg-gray-200"}`}></div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"}`}>2</div>
                    <div className={`flex-1 h-1
                  ${step >= 3 ? "bg-[var(--blue)]" : "bg-gray-200"}`}></div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"}`}>3</div>
                </div>
                
            </div>
            <div className="mt-10 text-bold text-center text-xl">
                {message[step - 1]}
            </div>
        </div>
    )
}


export default  ProgressBar;