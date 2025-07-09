'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema } from '@/lib/types';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { actionLoginUser } from '@/lib/server-action/auth-actions';
import Loader from '@/components/global/Loader';

const LoginPage = () => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState('');

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(FormSchema),
    defaultValues: { email: '', password: '' },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (
    formData
  ) => {
    console.log('Form data before sending:', formData);
    console.log('Email value:', formData.email);
    console.log('Password value:', formData.password ? '[HIDDEN]' : 'empty');
    
    // Double check the form values
    const emailValue = form.getValues('email');
    const passwordValue = form.getValues('password');
    
    console.log('Form.getValues - Email:', emailValue);
    console.log('Form.getValues - Password:', passwordValue ? '[HIDDEN]' : 'empty');
    
    try {
      // Call the server action with explicit parameters
      const result = await actionLoginUser({
        email: emailValue || formData.email,
        password: passwordValue || formData.password,
      });
      
      console.log('Server action result:', result);
      
      if (result.error) {
        form.reset();
        setSubmitError(result.error.message);
        return;
      }
      
      router.replace('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setSubmitError('An unexpected error occurred');
    }
  };

  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError) setSubmitError('');
        }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col"
      >
        <Link
          href="/"
          className="
          w-full
          flex
          justify-left
          items-center"
        >
          <Image
            src="/mindloom.png"
            alt="logo"
            width={50}
            height={50}
          />
          <span
            className="font-semibold
          dark:text-white text-4xl first-letter:ml-2"
          >
            Mindloom
          </span>
        </Link>
        <FormDescription
          className="
        text-foreground/60"
        >
          An all-In-One Collaboration and Productivity Platform
        </FormDescription>
        <FormField
          disabled={isLoading}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    console.log('Email field changed:', e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    console.log('Password field changed:', e.target.value ? '[HIDDEN]' : 'empty');
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {submitError && (
          <div className="text-red-500 text-sm">
            {submitError}
          </div>
        )}
        <Button
          type="submit"
          className="w-full p-6"
          size="lg"
          disabled={isLoading}
        >
          {!isLoading ? 'Login' : <Loader />}
        </Button>
        <span className="self-container">
          Dont have an account?{' '}
          <Link
            href="/signup"
            className="text-primary"
          >
            Sign Up
          </Link>
        </span>
      </form>
    </Form>
  );
};

export default LoginPage;