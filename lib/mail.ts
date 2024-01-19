import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const DOMAIN = "raid-signup.com";
const LINK_BASE = `https://www.${DOMAIN}`;
const VERIFICATION_EMAIL_ADDRESS = `verification@${DOMAIN}`;

export async function sendVerificationEmail(
  email: string, 
  token: string
) {
  console.log("Sending verification email...");
  
  const confirmationLink = `${LINK_BASE}/auth/verify?token=${token}`;

  await resend.emails.send({
    from: VERIFICATION_EMAIL_ADDRESS,
    to: email,
    subject: "Email Verification",
    text: "Please verify your email.",
    html: `
      <p>
        Please verify your email by <a href="${confirmationLink}">clicking here</a>.
      </p>
    `
  });

  console.log("Verification email sent from", VERIFICATION_EMAIL_ADDRESS, "to", email, "with confirmation link", confirmationLink);
}