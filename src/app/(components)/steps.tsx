"use client";

export default function Steps(){
    const steps = [
        {
            id:"1",
            text: "Choose Lesson type"
        },
        {
            id:"2",
            text: "Choose Your Plan"
        },
        {
            id:"3",
            text: "Schedule Lessons"
        },
        {
            id:"4",
            text: "Start Learning"
        },
    ];

    return(
        <div>
            <ol className="space-y-6 list-inside">
                {steps.map((step, index) => (
                    <li key={index} className="flex items-center text-md font-medium">
                        <span className="flex items-center justify-center w-10 h-10 mr-4 bg-[var(--blue)] text-white text-sm rounded-full font-bold">
                            {index + 1}
                        </span>
                        {step.text}
                    </li>
                ))}
            </ol>
        </div>
    );
}