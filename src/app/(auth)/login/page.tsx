'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'
import { FormSchema } from '@/lib/types';
import { Form, FormDescription, FormField, FormItem ,FormControl, FormMessage } from '@/components/ui/form';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';
import { actionLoginUser } from '@/lib/server-action/auth-actions';
const LoginPage = () => {
    const router = useRouter();
    const [submitError ,setSubmitError] = useState('');

    const form = useForm<z.infer<typeof FormSchema>>({
        mode: "onChange",
        resolver: zodResolver(FormSchema),
        defaultValues: {email: '' ,password: ''}
    });
  const isLoading = form.formState.isSubmitting;
  
  const onSubmit:SubmitHandler<z.infer<typeof FormSchema>> = async (
    formData
  ) => {
       const {error} = await actionLoginUser(formData);
       if(error){
        form.reset()
        setSubmitError(error.message);
       }
       router.replace('/dashboard')
  };

   return <Form {...form}>
    <form onChange={()=>{
        if(submitError) setSubmitError('');
    }} 
    onSubmit={form.handleSubmit(onSubmit)} 
    className='w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col'>
        <Link href="/"
        className='w-full flex justify-left items-center'>
            <Image src="/mindloom.png" alt="Mindloom Logo" width={50} height={50} />
            <span className='font-semibold dark:text-white text-4xl first-letter:ml-2'>Mindloom</span>
        </Link>
        <FormDescription className="text-foreground/60">
              An all-in-one Collaboration and Productivity Platform
        </FormDescription>
        <FormField 
           disabled={isLoading}
           control={form.control}
           name='email'
           render={({field})=>(
             <FormItem>
               <FormControl>
                   <Input
                       type='email' placeholder='Enter your email'
                       {...field} />
               </FormControl>
           </FormItem>
        )}/>
            
        <FormField 
           disabled={isLoading}
           control={form.control}
           name='password'
           render={({field})=>(
             <FormItem>
               <FormControl>
                   <Input
                       type='password' placeholder='Enter your password'
                       {...field} />
               </FormControl>
           </FormItem>
        )}/>
        {submitError && <FormMessage>{submitError}</FormMessage>}
        <Button type='submit' className='width-full p-6'
        size="lg" disabled={isLoading}>
          {!isLoading ? "Login" : <Loader/> }
        </Button>
        <span className='self-center'>
            Dont have an account?
            <Link href="/signup" className='text-primary'>
                   Sign Up
            </Link>
        </span>
    </form>
   </Form>;
}

export default LoginPage;