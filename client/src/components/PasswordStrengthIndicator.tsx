import { motion } from "framer-motion";
import { validators } from "@/utils/validators";
import { Check, X } from "lucide-react";

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const strength = validators.getPasswordStrength(password);
  const validation = validators.validatePassword(password);

  const requirements = [
    { label: "At least 8 characters", test: password.length >= 8 },
    { label: "One uppercase letter", test: /[A-Z]/.test(password) },
    { label: "One lowercase letter", test: /[a-z]/.test(password) },
    { label: "One number", test: /[0-9]/.test(password) },
  ];

  const strengthColors = {
    weak: "bg-red-500",
    medium: "bg-yellow-500",
    strong: "bg-green-500",
  };

  const strengthLabels = {
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
  };

  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Password strength:</span>
          <span className={`font-semibold ${
            strength === 'weak' ? 'text-red-600' : 
            strength === 'medium' ? 'text-yellow-600' : 
            'text-green-600'
          }`}>
            {strengthLabels[strength]}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ 
              width: strength === 'weak' ? '33%' : strength === 'medium' ? '66%' : '100%' 
            }}
            className={`h-full ${strengthColors[strength]} transition-all duration-300`}
          />
        </div>
      </div>

      <div className="space-y-1">
        {requirements.map((req, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-2 text-xs"
          >
            {req.test ? (
              <Check className="w-3 h-3 text-green-600" />
            ) : (
              <X className="w-3 h-3 text-gray-400" />
            )}
            <span className={req.test ? "text-green-600" : "text-muted-foreground"}>
              {req.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
