"use server";

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from '@/data/reset-password-token';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';

export async function newPassword(
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) {
  if (!token) {
    return { error: "Missing token!" };
  }

  const validatedValues = NewPasswordSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid fields!" };
  }

  const { password } = validatedValues.data;

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "User not found!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password updated!" };
}