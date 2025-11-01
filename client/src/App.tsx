import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ForgotPassword from "@/pages/ForgotPassword";
import StudentDashboard from "@/pages/StudentDashboard";
import TeacherDashboard from "@/pages/TeacherDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import NotFound from "@/pages/not-found";
import { UserRole } from "@shared/schema";

// Protected Route Component
function ProtectedRoute({ 
  component: Component, 
  allowedRole 
}: { 
  component: React.ComponentType; 
  allowedRole?: UserRole;
}) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  if (allowedRole && user?.role !== allowedRole) {
    // Redirect to correct dashboard if accessing wrong role dashboard
    const dashboards = {
      [UserRole.STUDENT]: "/student/dashboard",
      [UserRole.TEACHER]: "/teacher/dashboard",
      [UserRole.ADMIN]: "/admin/dashboard",
    };
    return <Redirect to={dashboards[user!.role]} />;
  }

  return <Component />;
}

function Router() {
  const { isAuthenticated } = useAuth();

  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/login">
        {isAuthenticated ? <Redirect to="/student/dashboard" /> : <Login />}
      </Route>
      <Route path="/signup">
        {isAuthenticated ? <Redirect to="/student/dashboard" /> : <Signup />}
      </Route>
      <Route path="/forgot-password">
        {isAuthenticated ? <Redirect to="/student/dashboard" /> : <ForgotPassword />}
      </Route>

      {/* Protected Dashboard Routes */}
      <Route path="/student/dashboard">
        <ProtectedRoute component={StudentDashboard} allowedRole={UserRole.STUDENT} />
      </Route>
      <Route path="/teacher/dashboard">
        <ProtectedRoute component={TeacherDashboard} allowedRole={UserRole.TEACHER} />
      </Route>
      <Route path="/admin/dashboard">
        <ProtectedRoute component={AdminDashboard} allowedRole={UserRole.ADMIN} />
      </Route>

      {/* Default Route */}
      <Route path="/">
        <Redirect to="/login" />
      </Route>

      {/* 404 Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: '0.5rem',
              fontFamily: 'Inter, system-ui, sans-serif',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}
