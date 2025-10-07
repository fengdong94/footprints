"use server";

// TODO purchase mail domain, change to resend?

// import { redirect } from 'next/navigation';
import { z } from "zod";
const nodemailer = require("nodemailer");
import { LoginSchema } from "@/lib/from-schemas";

export type State = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  success?: boolean;
  message?: string;
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fengdong9446@gmail.com",
    pass: "kptu bjme kpul lxbs",
  },
});

export async function signup(prevState: State, formData: FormData) {
  const result = LoginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) {
    return { errors: z.flattenError(result.error).fieldErrors };
  }

  const { email } = result.data;

  // send a verification email
  const info = await transporter.sendMail({
    from: '"Footprints" <fengdong9446@gmail.com>',
    to: email,
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world? HTML</b>",
  });

  console.log("info", info);

  return {
    success: true,
    message: `We just sent a verification link to ${email}.`,
  };

  // https://resend.com/auth/confirm-account?token=62154711bc3da7298936ec25a88bc2e147bb90c590799fe3c3df46a2&redirect_to=/onboarding
}

export async function login(prevState: State, formData: FormData) {
  const result = LoginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) {
    return { errors: z.flattenError(result.error).fieldErrors };
  }

  // authenticate, call signin in auth.ts

  return {
    success: true,
    message: `We just sent a verification link tox`,
  };

  // redirect('/home');
}

// info {
//   accepted: [ 'fengdong94@163.com' ],
//   rejected: [],
//   ehlo: [
//     'SIZE 35882577',
//     '8BITMIME',
//     'AUTH LOGIN PLAIN XOAUTH2 PLAIN-CLIENTTOKEN OAUTHBEARER XOAUTH',
//     'ENHANCEDSTATUSCODES',
//     'PIPELINING',
//     'CHUNKING',
//     'SMTPUTF8'
//   ],
//   envelopeTime: 1009,
//   messageTime: 826,
//   messageSize: 607,
//   response: '250 2.0.0 OK  1759878162 ffacd0b85a97d-4255d8e97f0sm26928926f8f.27 - gsmtp',
//   envelope: { from: 'fengdong9446@gmail.com', to: [ 'fengdong94@163.com' ] },
//   messageId: '<ceb721a3-35d4-f8e3-fd36-c321947f1930@gmail.com>'
// }