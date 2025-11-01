import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { InputField } from "@/components/InputField";
import { PasswordStrengthIndicator } from "@/components/PasswordStrengthIndicator";
import { authApi } from "@/utils/api";
import { validators } from "@/utils/validators";
import { config } from "@/utils/config";
import toast from "react-hot-toast";
import { Loader2, Info } from "lucide-react";

export default function Signup() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName || formData.fullName.length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validators.isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    } else if (!validators.isValidCollegeEmail(formData.email)) {
      newErrors.email = `Email must be from ${config.allowedEmailDomain} domain`;
    }

    const passwordValidation = validators.validatePassword(formData.password);
    if (!passwordValidation.valid) {
      newErrors.password = passwordValidation.errors[0];
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await authApi.signup(formData);
      
      if (response.success) {
        toast.success("Account created! Please log in.");
        setLocation("/login");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isEmailValid = formData.email && validators.isValidEmail(formData.email) && validators.isValidCollegeEmail(formData.email);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold text-foreground mb-2"
            >
              Create Student Account
            </motion.h1>
            <p className="text-gray-600 text-sm">
              Join Desired Career Academy today
            </p>
          </div>

          {/* Domain Notice */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex gap-3"
          >
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-1">College Email Required</p>
              <p className="text-blue-700">
                You must use your college email address ending with{" "}
                <span className="font-semibold">{config.allowedEmailDomain}</span> to register.
              </p>
            </div>
          </motion.div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              id="fullName"
              label="Full Name"
              type="text"
              icon="user"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              error={errors.fullName}
              showValidation
              isValid={formData.fullName.length >= 2}
              data-testid="input-fullname"
            />

            <InputField
              id="email"
              label="College Email"
              type="email"
              icon="email"
              placeholder={`student${config.allowedEmailDomain}`}
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={errors.email}
              showValidation
              isValid={isEmailValid}
              data-testid="input-email"
            />

            <div className="space-y-3">
              <InputField
                id="password"
                label="Password"
                type="password"
                icon="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                error={errors.password}
                data-testid="input-password"
              />
              <PasswordStrengthIndicator password={formData.password} />
            </div>

            <InputField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              icon="password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              error={errors.confirmPassword}
              showValidation
              isValid={formData.confirmPassword && formData.password === formData.confirmPassword}
              data-testid="input-confirm-password"
            />

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              data-testid="button-submit"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                "Create Account"
              )}
            </motion.button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors" data-testid="link-login">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
