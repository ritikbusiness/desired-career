import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "wouter";
import { GraduationCap, LogOut } from "lucide-react";

export default function StudentDashboard() {
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
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Welcome, {user?.fullName}!
                </h1>
                <p className="text-muted-foreground">Student Dashboard</p>
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
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">My Courses</h3>
              <p className="text-3xl font-bold text-blue-600">0</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-2">Assignments</h3>
              <p className="text-3xl font-bold text-purple-600">0</p>
            </div>
            <div className="bg-pink-50 rounded-lg p-6 border border-pink-200">
              <h3 className="font-semibold text-pink-900 mb-2">Progress</h3>
              <p className="text-3xl font-bold text-pink-600">0%</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-muted-foreground text-center">
              Your student dashboard is ready! Start exploring your courses and assignments.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
