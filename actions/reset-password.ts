"use server";

import * as z from "zod";

import { PasswordResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";

export async function requestResetPassword(values: z.infer<typeof PasswordResetSchema>) {
  const validatedValues = PasswordResetSchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: "Invalid email" };
  }

  const { email } = validatedValues.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found" };
  }

  if (!existingUser.emailVerified) {
    return { error: "Email not verified" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset password email sent" };
}