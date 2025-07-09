
'use server';

import { z } from 'zod';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { FormSchema } from '../types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  console.log('Server action received:', { 
    email, 
    password: password ? '[HIDDEN]' : 'undefined',
    emailType: typeof email,
    passwordType: typeof password
  });
  
  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return response;
}

export async function actionSignUpUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  
  // Check if user already exists
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email);

  if (data?.length) return { error: { message: 'User already exists', data } };
  
  // Sign up the user
  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}api/auth/callback`,
    },
  });
  
  return response;
}

export async function actionLogoutUser() {
  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  await supabase.auth.signOut();
  redirect('/login');
}