"use server";

// TODO restrict times of sending emails from the same user (Rate Limiting)
// TODO purchase mail domain, change to resend?
// TODO forget password?
// TODO 每个接口/server action 验证cookie？失败统一跳到登录页？路由拦截？

import jwt from "jsonwebtoken";
import { z } from "zod";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { LoginSchema } from "@/lib/from-schemas";
import prisma from "@/lib/prisma";

export type State = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  success?: boolean;
  msg?: string;
};

type JwtPayload = {
  type: string;
  email: string;
  password: string;
  iat: number;
  exp: number;
};

const SALT_ROUNDS = 10;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fengdong9446@gmail.com",
    pass: "kptu bjme kpul lxbs",
  },
});

export async function signup(
  prevState: State,
  formData: FormData
): Promise<State> {
  const result = LoginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) {
    return { errors: z.flattenError(result.error).fieldErrors };
  }

  const { email, password } = result.data;

  const user = await prisma.users.findUnique({ where: { email } });
  if (user) {
    return { msg: "This email has already been signed up." };
  }

  // TODO link domain: dev/prod
  const token = jwt.sign(
    { type: "email_verification", email, password },
    process.env.JWT_SECRET!,
    { expiresIn: 60 * 15 } // 15 minutes, reduce the risk of replay attack
  );

  // send a verification email
  await transporter.sendMail({
    from: '"Footprints" <fengdong9446@gmail.com>',
    to: email,
    subject: "Confirm your Footprints account",
    html: `<div style='text-align: center'><h3>Confirm Your Account</h3><p>Thank you for signing up for Footprints. To confirm your account, pleaseclick the button below.</p><a style='display: inline-block;width: 150px;height: 32px;background: #0b7dda;color: #fff;text-decoration: none;line-height: 32px;border-radius: 8px;'href='http://localhost:3000/confirm-account?token=${token}'>Confirm Account</a></div>`,
  });

  return {
    success: true,
    msg: `We just sent a verification link to ${email}.`,
  };
}

export async function login(
  prevState: State,
  formData: FormData
): Promise<State> {
  const result = LoginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) {
    return { errors: z.flattenError(result.error).fieldErrors };
  }

  const { email, password } = result.data;
  const user = await prisma.users.findUnique({ where: { email } });
  if (user) {
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      // TODO set cookie
      redirect("/");
    } else {
      return { msg: "Your password is incorrect." };
    }
  } else {
    return { msg: "This email has not been signed up." };
  }
}

export async function confirmAccount(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const { type, email, password } = decoded;

    if (type !== "email_verification") {
      return { msg: "Invalid token type." };
    }

    const user = await prisma.users.findUnique({ where: { email } });

    if (user) {
      return { msg: "This email has already been signed up." };
    } else {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      await prisma.users.create({ data: { email, password: hashedPassword } });
      // TODO set cookie?
      return { success: true };
    }
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return { msg: "The verification link is expired." };
    }
    return { msg: "Verification failed" };
  }
}
