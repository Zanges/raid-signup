import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const DOMAIN = "raid-signup.com";
const LINK_BASE = `https://www.${DOMAIN}`;
const VERIFICATION_EMAIL_ADDRESS = `verification@${DOMAIN}`;
const PASSWORD_RESET_EMAIL_ADDRESS = `password-reset@${DOMAIN}`;

export async function sendVerificationEmail(
  email: string, 
  token: string
) {
  const confirmationLink = `${LINK_BASE}/auth/verify?token=${token}`;

  await resend.emails.send({
    from: VERIFICATION_EMAIL_ADDRESS,
    to: email,
    subject: "Email Verification",
    html: `
      <p>
        Please verify your email by <a href="${confirmationLink}">clicking here</a>.
      </p>
    `
  });
}

export async function sendPasswordResetEmail(
  email: string, 
  token: string
) {
  const confirmationLink = `${LINK_BASE}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: PASSWORD_RESET_EMAIL_ADDRESS,
    to: email,
    subject: "Password Reset",
    html: `
      <p>
        If you requested a password reset, please do so by <a href="${confirmationLink}">clicking here</a>.
      </p>
    `
  });
  
}