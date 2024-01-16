"use server";

import * as z from "zod";

import { RegisterSchema } from "@/schemas";

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validatedValues = RegisterSchema.safeParse(values);

  if (!validatedValues.success) {
    return {
      error: "Invalid values!"
    };
  }

  return {
    success: "Registering!"
  };
}