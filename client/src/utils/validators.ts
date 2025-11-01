import { config } from "./config";

export const validators = {
  /**
   * Validates if email matches the allowed college domain
   */
  isValidCollegeEmail: (email: string): boolean => {
    return email.toLowerCase().endsWith(config.allowedEmailDomain);
  },

  /**
   * Validates email format
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Checks password strength
   * Returns: 'weak' | 'medium' | 'strong'
   */
  getPasswordStrength: (password: string): 'weak' | 'medium' | 'strong' => {
    let score = 0;
    
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    
    if (score <= 2) return 'weak';
    if (score <= 4) return 'medium';
    return 'strong';
  },

  /**
   * Validates password requirements
   */
  validatePassword: (password: string): {
    valid: boolean;
    errors: string[];
  } => {
    const errors: string[] = [];
    
    if (password.length < config.passwordRequirements.minLength) {
      errors.push(`Password must be at least ${config.passwordRequirements.minLength} characters`);
    }
    if (config.passwordRequirements.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (config.passwordRequirements.requireLowercase && !/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    if (config.passwordRequirements.requireNumber && !/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number");
    }
    
    return {
      valid: errors.length === 0,
      errors,
    };
  },
};
