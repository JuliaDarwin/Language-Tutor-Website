"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginForm(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () =>{

    }

    return (
        <div className="max-w-md w-[90%] mx-auto p-10 bg-white text-black shadow-lg rounded sm:mt-15 mb-10">
            <h1 className="text-center 2xl:text-xl">Good to see you back!</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email" className="block mb-2 mt-5">Email:</label>
                <input type="email" id="user" placeholder="example@gmail.com" className="w-full p-3 shadow rounded border-2 focus:border-green-300 focus:outline-none out-of-range:border-red-500"required onChange={e => setEmail(e.target.value)}/>
               
                <label htmlFor="password" className="block mb-2 mt-5">Password: </label>
                <input type="password" id="password" placeholder="********" className="w-full p-3 shadow rounded border-2 focus:border-green-300 focus:outline-none out-of-range:border-red-500" required onChange={e => setPassword(e.target.value)}/>
                <div className="flex flex-col mt-5">
                    <button type="submit" className="mt-6 py-2 px-5 bg-indigo-600 text-white rounded">Log In</button>
                </div>
            </form>

            <div className="flex flex-row gap-5 p-10" >
                <p>Don't have an account?</p>
                <Link href="/register" className="hover:text-indigo-600 hover:underline">Sign Up</Link>
            </div>
        </div>
    )

}