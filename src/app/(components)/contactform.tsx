"use client";

import { useState } from "react";
import ProgressBar from "./progressbar";
import { sendEmail } from "../contact/actions";


export default function ContactForm() {
    const [step, setStep] = useState(1);

function nextStep() {
    if (step < 3) setStep(step + 1);
}

function prevStep() {
    if (step > 1) setStep(step - 1);
}


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        weeklyLessons: "",
        lessonType: "",
        message: "",
    });
    const [msg, setMsg] = useState("");
    const [showForm, setShowForm] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.currentTarget;
    const checked = (e.currentTarget as HTMLInputElement).checked;        
    setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };
    
    const clientAction = async (fd: FormData) => {
        fd.set("name", formData.name);
        fd.set("email", formData.email);
        fd.set("weeklyLessons", formData.weeklyLessons);
        fd.set("lessonType", formData.lessonType);
        fd.set("message", formData.message);
        await sendEmail(fd);
        
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        //e.preventDefault();
        setMsg(`Name: ${formData.name}\nEmail: ${formData.email}\nWeekly Lessons: ${formData.weeklyLessons}\nLesson Type: ${formData.lessonType}\nMessage: ${formData.message}`);
        setShowForm(false);
    }
    return (
        <div className="max-w-md w-[90%] mx-auto p-10 bg-white text-black shadow-lg rounded sm:mt-15 mb-10">
            <h1 className="text-center 2xl:text-xl">Contact Form</h1>
        { showForm ? 
        <div>
            <ProgressBar step={step} />
            <form onSubmit={handleSubmit} action={clientAction}>
         { step == 1 && (
            <fieldset className="mt-2">
                <label htmlFor="weeklyLessons" className="block mb-2">Number of Weekly Lessons:</label>
                <input className="w-full p-3 shadow rounded border-2 focus:border-green-300 focus:outline-none out-of-range:border-red-500" type="number" min="1" max="4" id="weeklyLessons" name="weeklyLessons" value={formData.weeklyLessons} onChange={handleChange} required />

                <label htmlFor="lessonType" className="block mt-5 mb-2">Type of Lesson:</label>
                <select className="w-full p-3 border-2 shadow rounded focus:border-green-300 focus:outline-none" id="lessonType" name="lessonType" value={formData.lessonType} onChange={handleChange} required>
                    <option value="">Select an option</option>
                    <option value="conversational">Conversational</option>
                    <option value="general">General</option>
                    <option value="exams">Exams</option>
                    <option value="other">Other</option>
                </select>
                <div className="flex justify-end">
                    <button type="button" onClick={nextStep} className="mt-6 py-2 px-5 bg-[var(--blue)]/80 text-white rounded">
                Next </button>
                </div>
                
            </fieldset>

         ) } 
         { step == 2 && (
            <fieldset className="mt-2">
                <label htmlFor="name" className="block mb-2">Name:</label>
                <input placeholder="place your name here" className="w-full p-3 shadow rounded border-2 placeholder-gray-400 focus:border-green-300 focus:outline-none" type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                
                <label htmlFor="email" className="block mt-5 mb-2">Email:</label>
                <input placeholder="example@gmail.com" className="w-full p-3 shadow rounded border-2 placeholder-gray-400 focus:border-green-300 focus:outline-none" type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

            <div className="flex justify-between mt-10">
                 <button type="button" className="py-2 px-5 bg-gray-400 text-white rounded" onClick={prevStep}>
                Back </button>

                <button type="button" className="py-2 px-5 bg-[var(--blue)]/80 text-white rounded" onClick={nextStep}
                >Next </button>
             </div>
            </fieldset>

            )}  
            
         { step == 3 && (
            <fieldset className="my-4">
                <label className="block mt-5 mb-2" htmlFor="message">Additional Message:</label>
                <textarea className="w-full p-3 border-2 focus:border-green-300 focus:outline-none" id="message" name="message" value={formData.message} onChange={handleChange}></textarea>

                <label className="block my-2" htmlFor="terms">
                    <input className="mr-4 accent-[var(--lightblue)]" type="checkbox" id="terms" name="terms" required />
                    I agree to the terms and conditions
                </label>
                <div className="flex justify-between mt-10">
                    <button type="button" className="p-2 px-5 bg-gray-400 text-white rounded" onClick={prevStep}> Back </button>
                    <button className="px-5 bg-[var(--blue)]/80 text-white hover:bg-[var(--lightblue)] rounded" type="submit">Submit</button>
                </div> 
            </fieldset>
            )}   
            
        </form>
        </div> :
        <div className="flex flex-col gap-3 m-5 text-center">
            <p className="text-xl">Your form was successfully submitted!</p>
            <p className="font-bold">We will get back to you within 3 working days.</p>
            <p className="whitespace-pre-line">{msg}</p>
        </div>
        }       
        </div>
   )}

