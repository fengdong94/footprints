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
