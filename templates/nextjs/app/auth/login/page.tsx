/**
 * Login Page
 * Auth module example page showing LoginForm usage
 */

'use client'

import React from 'react'
import { LoginForm } from '@/modules/auth/components/LoginForm'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>
        <div className="flex justify-center">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
