"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedValues = LoginSchema.safeParse(values);

  if (!validatedValues.success) {
    return {
      error: "Invalid values!"
    };
  }

  const { email, password } = validatedValues.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.password || !existingUser.email) {
    return { error: "Invalid credentials!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email); // TODO: only regenerate if user requests new token

    sendVerificationEmail(verificationToken.email, verificationToken.token);
    
    return {
      success: "Please verify your email!",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
}

export async function providerLogin(provider: "google" | "discord") {
  await signIn(provider, { redirectTo: DEFAULT_LOGIN_REDIRECT });
}