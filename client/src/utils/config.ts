// Application configuration
export const config = {
  // Allowed college email domain for student signup
  // Change this to match your institution's email domain
  allowedEmailDomain: "@college.edu",
  
  // API base URL from environment variable
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "/api",
  
  // Password requirements
  passwordRequirements: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
  },
} as const;
