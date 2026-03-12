
"use client";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";



export default function Nav() {
  
    const [open, setOpen] = useState(false);

    return (
      <header>
 {/*desktop nav*/}
<nav className= "bg-black hidden sm:flex sticky top-0 opacity-80">
                 
<div className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-20 w-[95%] mx-auto px-5 py-4 sm:py-0">
            <div  className="flex flex-row justify-between mb-4 sm:mb-0">
              <div className="flex flex-row gap-5">
                <ThemeToggle />
                <Link href="/" className="hover:underline font-bold text-2xl text-white mb-4 sm:mb-0">Pordon School of Catalan</Link>
              </div>
             
            </div>
              <ul className="flex flex-col sm:flex-row items-center justify-center w-full sm:w-auto gap-2 sm:gap-8">
                <li className="hover:underline text-white">
                  <Link href="/about">About me</Link>
                </li>
                <li className="hover:underline text-white">
                  <Link href="/contact">Contact</Link>
                </li>
                <li className="hover:bg-amber-500 text-black text-center bg-amber-400 p-2 rounded-2xl">
                  <Link href="/lessons">Book a lesson</Link>
                </li>
                <li className="hidden sm:flex sm:flex-row sm:items-center sm:gap-5">
                    <SignedOut>
                      <SignInButton mode="modal" />
                    </SignedOut>
                    <UserButton />
                </li>
              </ul>
          </div>
          </nav>

          {/*phone nav*/}
        <nav className="sm:hidden bg-black sticky top-0 opacity-80">
          <button className="pt-2 pl-2 text-white" onClick={() => setOpen(!open)}>
            {open ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          {open && (
<div  className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-20 w-[95%] mx-auto px-10 py-4 sm:py-0">
            <div  className="flex flex-col justify-between items-center mb-4 sm:mb-0">    
                <Link href="/" className="hover:underline font-bold text-2xl text-white mb-4 sm:mb-0">Pordon School of Catalan</Link>
                <ThemeToggle />
            </div>
              <ul className="flex flex-col sm:flex-row items-center justify-center w-full sm:w-auto gap-2 sm:gap-8">
                <li className="hover:underline text-white">
                  <Link href="/about">About me</Link>
                </li>
                <li className="hover:underline text-white">
                  <Link href="/contact">Contact</Link>
                </li>
                <li className="hover:bg-amber-500 text-black text-center bg-amber-400 p-2 rounded-2xl">
                  <Link href="/lessons">Book a lesson</Link>
                </li>
                <li className="flex flex-row items-center gap-5">
                  <SignedOut>
                      <SignInButton mode="modal" />
                    </SignedOut>
                </li>
                  <SignedIn>
                      <SignOutButton />
                    </SignedIn>
                <li>
                  <SignedIn>
                    <Link href="/user-profile">Profile</Link>
                  </SignedIn>
                </li>
                
                
              </ul>
          </div>
          )}
         
          </nav>
      </header>
      
    )
}
