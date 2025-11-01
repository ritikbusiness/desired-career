import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { InputField } from "@/components/InputField";
import { authApi } from "@/utils/api";
import { validators } from "@/utils/validators";
import toast from "react-hot-toast";
import { Loader2, CheckCircle, ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!validators.isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authApi.forgotPassword({ email });
      
      if (response.success) {
        setIsSuccess(true);
        toast.success(response.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send reset link. Please try again.");
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
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl font-bold text-foreground mb-2"
                  >
                    Forgot Password?
                  </motion.h1>
                  <p className="text-gray-600 text-sm">
                    Enter your email to receive a reset link
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <InputField
                    id="email"
                    label="Email Address"
                    type="email"
                    icon="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    error={error}
                    data-testid="input-email"
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
                        <span>Sending...</span>
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </motion.button>
                </form>

                {/* Back to Login */}
                <div className="mt-8 text-center">
                  <Link href="/login" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors" data-testid="link-back-to-login">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Login
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="mb-6 flex justify-center"
                >
                  <CheckCircle className="w-20 h-20 text-green-500" />
                </motion.div>

                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Check Your Email
                </h2>
                <p className="text-gray-600 mb-2">
                  We've sent a password reset link to:
                </p>
                <p className="text-foreground font-medium mb-8">
                  {email}
                </p>
                <p className="text-sm text-gray-500 mb-8">
                  If you don't see the email, please check your spam folder.
                </p>

                <Link href="/login" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors" data-testid="link-return-to-login">
                  <ArrowLeft className="w-4 h-4" />
                  Return to Login
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
