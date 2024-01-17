"use server";

import bcrypy from "bcryptjs";
import * as z from "zod";

import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validatedValues = RegisterSchema.safeParse(values);

  if (!validatedValues.success) {
    return {
      error: "Invalid values!"
    };
  }

  const {
    email,
    username,
    password
  } = validatedValues.data;
  const hashedPassword = await bcrypy.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email is already in use!" }
  }

  await db.user.create({
    data: {
      email,
      username,
      password: hashedPassword
    },
  });

  return {
    success: "Registering!"
  };
}