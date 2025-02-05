import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must not exceed 20 characters"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(["agent", "admin"]).optional(), // only "agent" or "admin" should be allowed
});

export const loginSchema = z.object({
  username: z.string().min(3, "Invalid username"),
  password: z.string().min(6, "Invalid password"),
});
