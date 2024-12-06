"use client"
import { checkAndAddUser } from '@/lib/db-actions'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React, { useEffect } from 'react'

const Navbar = () => {
    const { isLoaded , user } = useUser()

    useEffect(() => {
        if (user?.primaryEmailAddress?.emailAddress && user?.fullName)
            checkAndAddUser(user?.primaryEmailAddress?.emailAddress, user?.fullName)
    }, [user])
    

    return (
        <div className="flex justify-evenly items-center h-12">
            <Link href="/">Home</Link>
            { (isLoaded && user) ? (
                <UserButton />
            ) : (
                <SignInButton />
            ) }
            
        </div>
    )
}

export default Navbar