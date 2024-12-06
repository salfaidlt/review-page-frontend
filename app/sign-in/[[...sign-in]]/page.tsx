import AuthWrapper from '@/app/components/AuthWrapper'
import { SignIn } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <AuthWrapper>
      <SignIn />
    </AuthWrapper>
  )
}

export default page