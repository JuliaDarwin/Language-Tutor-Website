
"use client";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";



export default function Nav() {
  
    const [open, setOpen] = useState(false);
    const { isSignedIn, user } = useUser();

    return (
      <header>
       {/*desktop nav*/}
        <nav className="hidden sm:flex sticky top-0 z-30 bg-slate-950/90 backdrop-blur border-b border-slate-800">
          <div className="flex flex-row justify-between items-center h-16 w-[90%] max-w-6xl mx-auto px-4">
            <div className="flex flex-row items-center gap-4">
              <ThemeToggle />
              <Link
                href="/"
                className="font-semibold text-lg text-white tracking-tight hover:text-indigo-200 transition-colors"
              >
                Pordon School of Catalan
              </Link>
            </div>
            <ul className="flex flex-row items-center justify-center gap-6 text-sm font-medium">
              <li>
                <Link
                  href="/about"
                  className="text-slate-100 hover:text-indigo-200 transition-colors"
                >
                  About me
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-100 hover:text-indigo-200 transition-colors"
                >
                  Contact
                </Link>
              </li>
              {isSignedIn && user?.publicMetadata?.role === "admin" ? (
                <>
                  <li>
                    <Link
                      href="/admin"
                      className="text-slate-100 hover:text-indigo-200 transition-colors"
                    >
                      Admin Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/lessons"
                      className="text-slate-100 hover:text-indigo-200 transition-colors"
                    >
                      Lessons
                    </Link>
                  </li>
                </>
              ) : isSignedIn ? (
                <>
                  <li>
                    <Link
                      href="/dashboard"
                      className="text-slate-100 hover:text-indigo-200 transition-colors"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/lessons"
                      className="text-slate-100 hover:text-indigo-200 transition-colors"
                    >
                      Lessons
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href="/lessons"
                    className="inline-flex items-center rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm hover:bg-amber-300 transition-colors"
                  >
                    Book a lesson
                  </Link>
                </li>
              )}
              <li className="hidden sm:flex flex-row items-center gap-3">
                <SignedOut>
                  <SignInButton mode="modal" forceRedirectUrl="/auth-callback">
                     <button className="text-slate-100 hover:text-indigo-200 transition-colors">
                         Sign in
                      </button>
                  </SignInButton>
                </SignedOut>
                <UserButton />
              </li>
            </ul>
          </div>
        </nav>

          {/*phone nav*/}
        <nav className="sm:hidden sticky top-0 z-30 bg-slate-950/90 backdrop-blur border-b border-slate-800">
          <button className="p-3 text-white" onClick={() => setOpen(!open)}>
            {open ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          {open && (
            <div className="border-t border-slate-800 bg-slate-950/95">
              <div className="flex flex-col gap-6 w-[90%] mx-auto py-6">
                <div className="flex flex-col items-start gap-3">
                  <Link
                    href="/"
                    className="font-semibold text-xl text-white tracking-tight"
                  >
                    Pordon School of Catalan
                  </Link>
                  <ThemeToggle />
                </div>
                <ul className="flex flex-col items-start gap-4 text-sm font-medium">
                  <li>
                    <Link
                      href="/about"
                      className="text-slate-100 hover:text-indigo-200 transition-colors"
                    >
                      About me
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-slate-100 hover:text-indigo-200 transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                  {isSignedIn && user?.publicMetadata?.role === "admin" ? (
                    <>
                      <li>
                        <Link
                          href="/admin"
                          className="text-slate-100 hover:text-indigo-200 transition-colors"
                        >
                          Admin Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/lessons"
                          className="text-slate-100 hover:text-indigo-200 transition-colors"
                        >
                          Lessons
                        </Link>
                      </li>
                    </>
                  ) : isSignedIn ? (
                    <>
                      <li>
                        <Link
                          href="/dashboard"
                          className="text-slate-100 hover:text-indigo-200 transition-colors"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/lessons"
                          className="text-slate-100 hover:text-indigo-200 transition-colors"
                        >
                          Lessons
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link
                        href="/lessons"
                        className="inline-flex items-center rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm hover:bg-amber-300 transition-colors"
                      >
                        Book a lesson
                      </Link>
                    </li>
                  )}
                  <li className="flex flex-row items-center gap-4">
                    <SignedOut>
                      <SignInButton mode="modal" forceRedirectUrl="/auth-callback">
                        <button className="text-slate-100 hover:text-indigo-200 transition-colors">
                         Sign in
                        </button>
                      </SignInButton>
                    </SignedOut>
                  </li>
                  <SignedIn>
                    <div className="flex flex-row items-center gap-4">
                      <SignOutButton />
                      <Link
                        href="/user-profile"
                        className="text-slate-100 hover:text-indigo-200 transition-colors"
                      >
                        Profile
                      </Link>
                    </div>
                  </SignedIn>
                </ul>
              </div>
            </div>
          )}
         
          </nav>
      </header>
      
    )
}