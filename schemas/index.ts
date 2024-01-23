import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(6, { 
    message: 'Must be at least 6 characters long'
  }),
});

export const PasswordResetSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { 
    message: 'Must be at least 6 characters long'
  }),
});

export const NewCharacterSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  realm: z.string().min(1, { message: 'Realm is required' }),
  faction: z.enum(['ALLIANCE', 'HORDE']),
  // gameVersion: z.enum(['RETAIL', 'CLASSIC']),
  characterClass: z.enum([
    'DEATHKNIGHT',
    'DEMONHUNTER',
    'DRUID',
    'EVOKER',
    'HUNTER',
    'MAGE',
    'MONK',
    'PALADIN',
    'PRIEST',
    'ROGUE',
    'SHAMAN',
    'WARLOCK',
    'WARRIOR'
  ]),
  spec: z.string().min(1, { message: 'Spec is required' }),
});