"use server";

import * as z from "zod";

import { LoginSchema } from "@/schemas";

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedValues = LoginSchema.safeParse(values);

  if (!validatedValues.success) {
    return {
      error: "Invalid values!"
    };
  }

  return {
    success: "Logging in!"
  };
}