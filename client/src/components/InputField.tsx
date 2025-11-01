import { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Check } from "lucide-react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: "email" | "password" | "user";
  showValidation?: boolean;
  isValid?: boolean;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, icon, type = "text", showValidation, isValid, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const inputType = type === "password" && showPassword ? "text" : type;

    const IconComponent = icon === "email" ? Mail : icon === "password" ? Lock : icon === "user" ? User : null;

    const borderClasses = error
      ? "border-red-500 ring-2 ring-red-200"
      : isValid && showValidation
      ? "border-green-500 ring-2 ring-green-200"
      : isFocused
      ? "border-blue-500 ring-2 ring-blue-200"
      : "border-gray-300";

    return (
      <div className="w-full">
        <label htmlFor={props.id} className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
        <div className="relative">
          {IconComponent && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              <IconComponent className="w-5 h-5" />
            </div>
          )}
          <input
            ref={ref}
            type={inputType}
            className={`w-full h-12 ${IconComponent ? "pl-11" : "pl-4"} pr-4 text-base bg-background border-2 rounded-lg transition-all duration-200 focus:outline-none ${borderClasses}`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${props.id}-error` : undefined}
            {...props}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
              data-testid={`button-toggle-password-${props.id}`}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
          {showValidation && isValid && !error && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500"
            >
              <Check className="w-5 h-5" />
            </motion.div>
          )}
        </div>
        <AnimatePresence>
          {error && (
            <motion.p
              id={`${props.id}-error`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                x: [-10, 10, -10, 10, 0]
              }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-red-600 text-xs mt-1"
              role="alert"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

InputField.displayName = "InputField";
