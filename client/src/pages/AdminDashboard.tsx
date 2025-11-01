import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "wouter";
import { Shield, LogOut } from "lucide-react";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Welcome, {user?.fullName}!
                </h1>
                <p className="text-muted-foreground">Admin Dashboard</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h3 className="font-semibold text-red-900 mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-red-600">0</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
              <h3 className="font-semibold text-orange-900 mb-2">Active Courses</h3>
              <p className="text-3xl font-bold text-orange-600">0</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
              <h3 className="font-semibold text-yellow-900 mb-2">System Status</h3>
              <p className="text-3xl font-bold text-yellow-600">Active</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-muted-foreground text-center">
              Your admin dashboard is ready! Manage users, courses, and system settings.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
