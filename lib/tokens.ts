import { v4 as uuidv4 } from 'uuid';

import { getVerificationTokenByEmail } from '@/data/verification-token';
import { db } from '@/lib/db';

export async function generateVerificationToken(email: string) {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 60 * 60 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id }
    });
  }

  const verficationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires
    }
  });

  return verficationToken;
}