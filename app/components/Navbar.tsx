"use client"
import { checkAndAddUser } from '@/lib/db-actions'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AddReview } from './AddReview'

const Navbar = () => {
    const { isLoaded, user } = useUser()
    const [newUser, setNewUser] = useState(false)
    const [email, setEmail] = useState("")
    const [fullName, setFullName] = useState("")

    useEffect(() => {
        if (user?.primaryEmailAddress?.emailAddress && user?.fullName) {
            checkAndAddUser(user?.primaryEmailAddress?.emailAddress, user?.fullName, setNewUser);

            setEmail(user?.primaryEmailAddress?.emailAddress) 
            setFullName(user?.fullName)
            if (newUser)
                toast.success("Welcome among us " + fullName)

            }
        }, [fullName, newUser, user]);



    return (
        <div className="flex justify-evenly items-center h-12">
            <Link href="/">Home</Link>
            {(isLoaded && user) ? (
                <>
                    <UserButton />
                    <AddReview email={email} />
                </>
            ) : (
                <SignInButton />
            )}

        </div>
    )
}

export default Navbar