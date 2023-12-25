
"use client";

import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { Context } from '@/Components/Clients';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';


const Page = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser } = useContext(Context);

    const registerHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name, email, password,
                }),
            });
            const data = await res.json();
            if (!data.success) return toast.error(data.message);
            setUser(data.user);
            toast.success(data.message);
        } catch (error) {
            return toast.error(error);
        }
    }

    if (user._id) return redirect("/");
    return (
        <div className='login'>
            <section>
                <form onSubmit={registerHandler}>
                    <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Enter Full Name' />
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Enter Email' />
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Enter Password' />
                    <button type="submit">Sign Up</button>
                    <Link href={"/login"}>Old User?</Link>
                </form>
            </section>
        </div>
    )
}
// export const metadata = {
//     title: "Register Page",
//     description: "Register Page for Todo App",
// };

export default Page