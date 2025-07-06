'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Link from 'next/link'
import Image from 'next/image'
import { Form, FormDescription, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Loader from '@/components/Loader'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { MailCheck } from 'lucide-react'
import { actionSignUpUser } from '@/lib/server-action/auth-actions'

// ✅ Schema for validation
const SignUpFormSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(8, "Password must be minimum 8 characters"),
  confirmPassword: z.string().min(8, "Password must be minimum 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

const Signup = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [submitError, setSubmitError] = useState('')
  const [confirmation, setConfirmation] = useState(false)

  const codeExchangeError = useMemo(() => {
    if (!searchParams) return ''
    return searchParams.get('error_description')
  }, [searchParams])

  const confirmationAndErrorStyles = useMemo(() =>
    clsx('bg-primary', {
      'bg-red-500/10': codeExchangeError,
      'border-red-500/50': codeExchangeError,
      'text-red-700': codeExchangeError,
    }), [codeExchangeError])

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  // ✅ CORRECT onSubmit function
  const onSubmit = async (values: z.infer<typeof SignUpFormSchema>) => {
    const { email, password } = values

    const { error } = await actionSignUpUser({ email, password })
    if (error) {
      setSubmitError(error.message || 'Signup failed')
      form.reset()
      return
    }

    setConfirmation(true)
  }

  return (
    <Form {...form}>
      <form
        onChange={() => submitError && setSubmitError('')}
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col'
      >
        <Link href="/" className='w-full flex justify-left items-center'>
          <Image src="/mindloom.png" alt="Mindloom Logo" width={50} height={50} />
          <span className='font-semibold dark:text-white text-4xl ml-2'>Mindloom</span>
        </Link>

        <FormDescription className="text-foreground/60">
          An all-in-one Collaboration and Productivity Platform
        </FormDescription>

        {!confirmation && !codeExchangeError && <>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type='email' placeholder='Enter your email' {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type='password' placeholder='Enter your password' {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type='password' placeholder='Confirm Password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='w-full p-6' disabled={isLoading}>
            {!isLoading ? 'Create Account' : <Loader />}
          </Button>
        </>}

        {submitError && <FormMessage>{submitError}</FormMessage>}

        <span className='self-center'>
          Already have an account?{' '}
          <Link href="/login" className='text-primary'>
            Login
          </Link>
        </span>

        {(confirmation || codeExchangeError) && (
          <Alert className={confirmationAndErrorStyles}>
            {!codeExchangeError && <MailCheck className='h-4 w-4' />}
            <AlertTitle>
              {codeExchangeError ? 'Invalid Link' : 'Check your email'}
            </AlertTitle>
            <AlertDescription>
              {codeExchangeError || 'A confirmation email has been sent to your inbox.'}
            </AlertDescription>
          </Alert>
        )}
      </form>
    </Form>
  )
}

export default Signup
