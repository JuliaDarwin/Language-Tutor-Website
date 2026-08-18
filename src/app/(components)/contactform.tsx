"use client";

import { useState } from "react";
import ProgressBar from "./progressbar";
import { sendEmail } from "../contact/actions";
import { FiChevronDown } from "react-icons/fi";

const inputClass =
  "w-full appearance-none rounded-xl border border-[var(--border-subtle)] bg-[var(--background)] px-4 py-3 pr-10 text-[var(--foreground)] shadow-sm transition placeholder:text-[var(--foreground-muted)] focus:border-[var(--indigo)] focus:outline-none focus:ring-2 focus:ring-[var(--indigo)]/20 cursor-pointer";

const labelClass = "mb-2 block text-sm font-medium text-[var(--foreground)]";

const btnPrimary =
  "inline-flex items-center rounded-full bg-[var(--indigo)] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--indigo-light)] hover:text-slate-950";

const btnSecondary =
  "inline-flex items-center rounded-full border border-[var(--border-subtle)] px-6 py-2.5 text-sm font-semibold text-[var(--foreground-muted)] transition hover:border-[var(--indigo)] hover:text-[var(--indigo)]";

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    weeklyLessons: "",
    lessonType: "",
    message: "",
  });
  const [msg, setMsg] = useState("");
  const [showForm, setShowForm] = useState(true);

  function nextStep() {
    if(validateStep(step)){
      if (step < 3) setStep(step + 1);
    }
    
  }

  function prevStep() {
    if (step > 1) setStep(step - 1);
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.currentTarget;
    const checked = (e.currentTarget as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  }
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
    e.preventDefault();
    if(!validateStep(3)){
      return; 
    }
    setMsg(
      `Name: ${formData.name}\nEmail: ${formData.email}\nWeekly Lessons: ${formData.weeklyLessons}\nLesson Type: ${formData.lessonType}\nMessage: ${formData.message}`
    );
    setShowForm(false);
  };

  const validateStep = (currentStep: number) => {
    const newErrors: { [key: string]: string } = {};

    if(currentStep === 1){
      if(!formData.weeklyLessons){
        newErrors.weeklyLessons = "Please enter the number of weekly lessons."
      } 
      if (!formData.lessonType) {
      newErrors.lessonType = "Please select a lesson type.";
      }
    }
    if (currentStep === 2){
      if(!formData.name.trim()){
        newErrors.name = "Name is required.";
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // returns true if valid

  }

  return (
    <div className="rounded-3xl my-24 border border-[var(--border-subtle)] bg-[var(--card-background)] p-6 shadow-md sm:p-10">
      <h2>
        Contact form
      </h2>
      <h3>
        Tell us about your lessons
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--foreground-muted)]">
        Fill in a few details and we&apos;ll get back to you within 3 working days.
      </p>

      {showForm ? (
        <div className="mt-8">
          <ProgressBar step={step} />
          <form onSubmit={handleSubmit} action={clientAction} className="space-y-1">
            {step === 1 && (
              <fieldset className="space-y-5">
                <div>
                  <label htmlFor="weeklyLessons" className={labelClass}>
                    Number of weekly lessons
                  </label>
                  <div className="relative">
                    <select
                      className={inputClass}
                      id="weeklyLessons"
                      name="weeklyLessons"
                      value={formData.weeklyLessons}
                      onChange={handleChange}
                    >
                      <option value="">select an option</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="intensive">Intensive- 5 or more</option>
                    </select>
                    <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg text-[var(--foreground-muted)]" />
                  </div>
                  {errors.weeklyLessons && (
                    <span className="text-xs text-red-500 mt-1 block">{errors.weeklyLessons}</span>
                  )}
                </div>
                <div>
                  <label htmlFor="lessonType" className={labelClass}>
                    Type of lesson
                  </label>
                  <div className="relative">
                    <select
                      className={inputClass}
                      id="lessonType"
                      name="lessonType"
                      value={formData.lessonType}
                      onChange={handleChange}
                    >
                      <option value="">Select an option</option>
                      <option value="conversational">Conversational</option>
                      <option value="general">General</option>
                      <option value="exams">Exams</option>
                      <option value="other">Other</option>
                    </select>
                    <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg text-[var(--foreground-muted)]" />
                  </div>
                  {errors.lessonType && (
    <span className="text-xs text-red-500 mt-1 block">{errors.lessonType}</span>
  )}
                </div>
                <div className="flex justify-end pt-2">
                  <button type="button" onClick={nextStep} className={btnPrimary}>
                    Next
                  </button>
                </div>
              </fieldset>
            )}

            {step === 2 && (
              <fieldset className="space-y-5">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Name
                  </label>
                  <input
                    placeholder="Your name"
                    className={inputClass}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    
                  />
                  {errors.name && (
    <span className="text-xs text-red-500 mt-1 block">{errors.name}</span>
  )}
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    placeholder="you@example.com"
                    className={inputClass}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    
                  />
                  {errors.email && (
    <span className="text-xs text-red-500 mt-1 block">{errors.email}</span>
  )}
                </div>
                <div className="flex justify-between pt-2">
                  <button type="button" className={btnSecondary} onClick={prevStep}>
                    Back
                  </button>
                  <button type="button" className={btnPrimary} onClick={nextStep}>
                    Next
                  </button>
                </div>
              </fieldset>
            )}

            {step === 3 && (
              <fieldset className="space-y-5">
                <div>
                  <label className={labelClass} htmlFor="message">
                    Additional message
                  </label>
                  <textarea
                    className={`${inputClass} min-h-[120px] resize-y`}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                <label
                  className="flex cursor-pointer items-start gap-3 text-sm text-[var(--foreground-muted)]"
                  htmlFor="terms"
                >
                  <input
                    className="mt-1 accent-[var(--indigo)]"
                    type="checkbox"
                    id="terms"
                    name="terms"
                    required
                  />
                  I agree to the terms and conditions
                </label>
                <div className="flex justify-between pt-2">
                  <button type="button" className={btnSecondary} onClick={prevStep}>
                    Back
                  </button>
                  <button
                    className="inline-flex items-center rounded-full bg-[var(--amber)] px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-md shadow-amber-500/20 transition hover:bg-amber-300"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </fieldset>
            )}
          </form>
        </div>
      ) : (
        <div className="mt-8 space-y-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--indigo-soft)] p-6 text-center sm:p-8 flex flex-col justify-center items-center w-[50%] mx-auto">
          <p className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
            Your form was successfully submitted!
          </p>
          <p className="text-sm text-[var(--foreground-muted)]">
            We will get back to you within 3 working days.
          </p>
          <p className="whitespace-pre-line rounded-xl p-4 text-left text-sm text-[var(--foreground-muted)]">
            {msg}
          </p>
        </div>
      )}
    </div>
  );
}
