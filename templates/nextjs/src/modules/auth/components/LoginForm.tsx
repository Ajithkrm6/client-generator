/**
 * Login Form Component
 * Example form using react-hook-form + Zod validation
 * Shows form handling patterns and error display
 */

'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useAuthStore } from '../store/auth.store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// Validation schema using Zod
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export const LoginForm: React.FC = () => {
  const router = useRouter()
  const { login, isLoading, error: authError } = useAuthStore()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setSubmitError(null)
      await login(data.email, data.password)
      // Redirect to dashboard on successful login
      router.push('/dashboard')
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'An error occurred during login'
      )
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          {/* Error Messages */}
          {(submitError || authError) && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {submitError || authError}
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>

          {/* Forgot Password Link */}
          <div className="text-center">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-muted-foreground hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Signup Link */}
          <div className="text-center text-sm">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="font-semibold hover:underline">
              Sign up
            </Link>
          </div>
        </form>

        {/* Demo Credentials Note */}
        <div className="mt-6 rounded-md bg-amber-50 p-3 text-xs text-amber-900 dark:bg-amber-950 dark:text-amber-100">
          <p className="font-semibold">Demo Credentials:</p>
          <p>Email: demo@example.com</p>
          <p>Password: password123</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default LoginForm
