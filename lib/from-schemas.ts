import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email("The email format is incorrect."),
  password: z
    .string()
    .min(8, "The password must be longer than 8 characters.")
    .regex(/[A-Z]/, "The password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "The password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "The password must contain at least one number.")
    .regex(
      /[()#^@$!%*?&]/,
      "The password must contain at least one special character. (#^@$!%*?&)"
    ),
});

export const ProfileSchema = z.object({
  name: z
    .string()
    .min(2, "The name must be longer than 2 characters.")
    .max(50, "The name must be shorter than 50 characters.")
    .optional(),
  bio: z
    .string()
    .max(200, "The bio must be shorter than 200 characters.")
    .optional(),
  avatar: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 1 * 1024 * 1024,
      "The file size should not be more than 5MB."
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      `Only support JPG, PNG, WEBP`
    )
    .optional(),
});
