import { motion } from "framer-motion";
import { UserRole } from "@shared/schema";
import { GraduationCap, BookOpen, Shield } from "lucide-react";

interface RoleSelectorProps {
  selectedRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const roles = [
  { value: UserRole.STUDENT, label: "Student", icon: GraduationCap },
  { value: UserRole.TEACHER, label: "Teacher", icon: BookOpen },
  { value: UserRole.ADMIN, label: "Admin", icon: Shield },
];

export function RoleSelector({ selectedRole, onRoleChange }: RoleSelectorProps) {
  return (
    <div role="radiogroup" aria-label="Select your role">
      <label className="block text-sm font-medium text-foreground mb-2">
        I am a
      </label>
      <div className="grid grid-cols-3 gap-2">
        {roles.map(({ value, label, icon: Icon }) => {
          const isSelected = selectedRole === value;
          return (
            <motion.button
              key={value}
              type="button"
              onClick={() => onRoleChange(value)}
              className={`h-12 rounded-lg font-medium text-sm transition-all duration-200 border-2 flex items-center justify-center gap-2 ${
                isSelected
                  ? "bg-blue-600 text-white border-blue-700 shadow-md"
                  : "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200"
              }`}
              whileTap={{ scale: 0.98 }}
              role="radio"
              aria-checked={isSelected}
              data-testid={`button-role-${value}`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
