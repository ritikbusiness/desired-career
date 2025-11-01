import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { InputField } from "@/components/InputField";
import { RoleSelector } from "@/components/RoleSelector";
import { useAuth } from "@/context/AuthContext";
import { authApi } from "@/utils/api";
import { UserRole } from "@shared/schema";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Client-side validation
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await authApi.login({ email, password, role });
      
      if (response.success && response.user) {
        login(response.user);
        toast.success("Welcome back!");
        
        // Redirect based on role
        const dashboards = {
          [UserRole.STUDENT]: "/student/dashboard",
          [UserRole.TEACHER]: "/teacher/dashboard",
          [UserRole.ADMIN]: "/admin/dashboard",
        };
        setLocation(dashboards[role]);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100">
          {/* Branding */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
            >
              Desired Career Academy
            </motion.h1>
            <p className="text-gray-600 text-sm">
              Access your personalized learning dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <RoleSelector selectedRole={role} onRoleChange={setRole} />

            <InputField
              id="email"
              label="Email Address"
              type="email"
              icon="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              data-testid="input-email"
            />

            <div>
              <InputField
                id="password"
                label="Password"
                type="password"
                icon="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                data-testid="input-password"
              />
              <div className="mt-2 text-right">
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors" data-testid="link-forgot-password">
                  Forgot Password?
                </Link>
              </div>
            </div>

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
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                New to Desired Career Academy?
              </span>
            </div>
          </div>

          {/* Signup Link */}
          <div className="text-center">
            <Link href="/signup" className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors" data-testid="link-signup">
              Create an account
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
