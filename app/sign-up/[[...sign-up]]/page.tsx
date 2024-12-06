import AuthWrapper from '@/app/components/AuthWrapper'
import { SignUp } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <AuthWrapper>
      <SignUp />
    </AuthWrapper>
  )
}

export default page