"use client";

import Link from "next/link";
import { useState } from "react";


export default function RegisterForm(){

    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () =>{

    }

    return (
        <div className="max-w-md w-[90%] mx-auto p-10 bg-white text-black shadow-lg rounded sm:mt-15 mb-10">
            <h1 className="text-center 2xl:text-xl">Welcome!</h1>
            <form onSubmit={handleSubmit}>

                <label htmlFor="user" className="block mb-2 mt-5">Username:</label>
                <input type="text" id="user" placeholder="your username here" className="w-full p-3 shadow rounded border-2 focus:border-green-300 focus:outline-none out-of-range:border-red-500"required onChange={e => setUser(e.target.value)}/>

                <label htmlFor="email" className="block mb-2 mt-5">Email:</label>
                <input type="email" id="email" placeholder="example@gmail.com" className="w-full p-3 shadow rounded border-2 focus:border-green-300 focus:outline-none out-of-range:border-red-500"required onChange={e => setEmail(e.target.value)}/>
               
                <label htmlFor="password" className="block mb-2 mt-5">Password: </label>
                <input type="password" id="password" placeholder="********" className="w-full p-3 shadow rounded border-2 focus:border-green-300 focus:outline-none out-of-range:border-red-500" required onChange={e => setPassword(e.target.value)}/>
                <div className="flex flex-col mt-5">
                    <button type="submit" className="mt-6 py-2 px-5 bg-indigo-600 text-white rounded">Sign Up</button>
                </div>

                <label className="block my-2" htmlFor="terms">
                    <input className="mr-4 accent-fuchsia-600" type="checkbox" id="terms" name="terms" required />
                    I agree to the terms and conditions
                </label>
            </form>

        
        </div>
    )
}