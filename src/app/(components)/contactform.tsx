"use client";

import { useState } from "react";
import ProgressBar from "./progressbar";
import { sendEmail } from "../contact/actions";

const inputClass =
  "w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--background)] p-3 text-[var(--foreground)] shadow-sm transition placeholder:text-[var(--foreground-muted)] focus:border-[var(--indigo)] focus:outline-none focus:ring-2 focus:ring-[var(--indigo)]/20";

const labelClass = "mb-2 block text-sm font-medium text-[var(--foreground)]";

const btnPrimary =
  "inline-flex items-center rounded-full bg-[var(--indigo)] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--indigo-light)] hover:text-slate-950";

const btnSecondary =
  "inline-flex items-center rounded-full border border-[var(--border-subtle)] px-6 py-2.5 text-sm font-semibold text-[var(--foreground-muted)] transition hover:border-[var(--indigo)] hover:text-[var(--indigo)]";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
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
    setMsg(
      `Name: ${formData.name}\nEmail: ${formData.email}\nWeekly Lessons: ${formData.weeklyLessons}\nLesson Type: ${formData.lessonType}\nMessage: ${formData.message}`
    );
    setShowForm(false);
  };

  return (
    <div className="rounded-3xl my-24 border border-[var(--border-subtle)] bg-[var(--surface)] p-6 shadow-md sm:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
        Contact form
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
        Tell us about your lessons
      </h2>
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
                  <input
                    className={inputClass}
                    type="number"
                    min="1"
                    max="4"
                    id="weeklyLessons"
                    name="weeklyLessons"
                    value={formData.weeklyLessons}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lessonType" className={labelClass}>
                    Type of lesson
                  </label>
                  <select
                    className={inputClass}
                    id="lessonType"
                    name="lessonType"
                    value={formData.lessonType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="conversational">Conversational</option>
                    <option value="general">General</option>
                    <option value="exams">Exams</option>
                    <option value="other">Other</option>
                  </select>
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
                    required
                  />
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
                    required
                  />
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
        <div className="mt-8 space-y-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--indigo-soft)] p-6 text-center sm:p-8">
          <p className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
            Your form was successfully submitted!
          </p>
          <p className="text-sm text-[var(--foreground-muted)]">
            We will get back to you within 3 working days.
          </p>
          <p className="whitespace-pre-line rounded-xl bg-[var(--surface)] p-4 text-left text-sm text-[var(--foreground-muted)]">
            {msg}
          </p>
        </div>
      )}
    </div>
  );
}
