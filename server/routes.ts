import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcrypt";
import { loginSchema, signupSchema, forgotPasswordSchema, UserRole } from "@shared/schema";

const SALT_ROUNDS = 10;

export async function registerRoutes(app: Express): Promise<Server> {
  // Login endpoint
  app.post("/api/auth/login", async (req, res) => {
    try {
      // Validate request body
      const validation = loginSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid input",
          errors: validation.error.errors,
        });
      }

      const { email, password, role } = validation.data;

      // Find user by email
      const user = await storage.getUserByEmail(email);
      
      // Use generic error message to prevent enumeration attacks
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      // Verify role matches - use same generic message to prevent role enumeration
      if (user.role !== role) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      // Verify password - use same generic message
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      // Return success with user data (exclude password)
      return res.json({
        success: true,
        message: "Login successful",
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred during login",
      });
    }
  });

  // Signup endpoint (students only)
  app.post("/api/auth/signup", async (req, res) => {
    try {
      // Validate request body
      const validation = signupSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid input",
          errors: validation.error.errors,
        });
      }

      const { fullName, email, password } = validation.data;

      // Server-side validation: Check college email domain
      const ALLOWED_EMAIL_DOMAIN = "@college.edu";
      if (!email.toLowerCase().endsWith(ALLOWED_EMAIL_DOMAIN)) {
        return res.status(400).json({
          success: false,
          message: `Email must be from ${ALLOWED_EMAIL_DOMAIN} domain`,
        });
      }

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "An account with this email already exists",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      // Create user (always student role for signup)
      const newUser = await storage.createUser({
        fullName,
        email,
        password: hashedPassword,
        role: UserRole.STUDENT,
      });

      // Return success with user data (exclude password)
      return res.status(201).json({
        success: true,
        message: "Account created successfully",
        user: {
          id: newUser.id,
          fullName: newUser.fullName,
          email: newUser.email,
          role: newUser.role,
        },
      });
    } catch (error) {
      console.error("Signup error:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred during signup",
      });
    }
  });

  // Forgot password endpoint (simulated email sending)
  app.post("/api/auth/forgot-password", async (req, res) => {
    try {
      // Validate request body
      const validation = forgotPasswordSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid input",
          errors: validation.error.errors,
        });
      }

      const { email } = validation.data;

      // Check if user exists (but don't reveal if they don't for security)
      const user = await storage.getUserByEmail(email);

      // Simulate email sending delay (2-3 seconds)
      await new Promise((resolve) => setTimeout(resolve, 2500));

      // Always return success to prevent email enumeration
      // In production, only send email if user exists
      if (user) {
        // TODO: Implement actual email sending here
        console.log(`Password reset link would be sent to: ${email}`);
      }

      return res.json({
        success: true,
        message: `Password reset link sent to ${email} (simulation).`,
      });
    } catch (error) {
      console.error("Forgot password error:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while processing your request",
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);

  return httpServer;
}
