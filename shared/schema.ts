import { z } from "zod";

// User role enum
export const UserRole = {
  STUDENT: "student",
  TEACHER: "teacher",
  ADMIN: "admin",
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

// User schema for authentication
export const userSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum([UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN]),
});

// Login schema
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  role: z.enum([UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN]),
});

// Signup schema (students only)
export const signupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// Types
export type User = z.infer<typeof userSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

// API response types
export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    fullName: string;
    email: string;
    role: UserRole;
  };
}
