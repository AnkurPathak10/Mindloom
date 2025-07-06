/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { z } from "zod";
import { FormSchema } from "../types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Login User
export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies });

  // 🛡️ Prevent missing inputs
  if (!email || !password) {
    return { error: { message: "Missing email or password", data: null } };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

// Sign Up User
export async function actionSignUpUser({
    email,
    password,
  }: { email: string; password: string }) {
    const supabase = createRouteHandlerClient({ cookies });
  
    const response = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
      },
    });
  
    return response;
  }
  