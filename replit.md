# Desired Career Academy - Authentication Module

## Project Overview
A modern, professional authentication system for the Desired Career Academy LMS platform. Features role-based login, student signup with college email validation, and password reset functionality.

## Tech Stack
- **Frontend**: React 18 + TypeScript, Vite
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Routing**: Wouter (React Router alternative)
- **Notifications**: react-hot-toast
- **API Client**: Axios
- **Backend**: Express.js (Node.js)
- **State Management**: React Context API

## Features Implemented

### Authentication Pages
1. **Login Page** (`/login`)
   - Role selector (Student/Teacher/Admin)
   - Email and password inputs with validation
   - Forgot password link
   - Redirect to role-specific dashboards
   - Beautiful gradient UI with animations

2. **Signup Page** (`/signup`)
   - Student-only registration
   - College email domain validation (@college.edu)
   - Password strength indicator
   - Real-time form validation
   - Password requirements checklist

3. **Forgot Password Page** (`/forgot-password`)
   - Email input for password reset
   - Simulated email sending (2-3 second delay)
   - Success state with confirmation message

### Dashboards (Placeholders)
- Student Dashboard (`/student/dashboard`)
- Teacher Dashboard (`/teacher/dashboard`)
- Admin Dashboard (`/admin/dashboard`)

## Project Structure
```
client/src/
  ├── components/
  │   ├── InputField.tsx          # Reusable input with validation states
  │   ├── RoleSelector.tsx        # Segmented control for role selection
  │   └── PasswordStrengthIndicator.tsx  # Password strength meter
  ├── context/
  │   └── AuthContext.tsx         # Authentication state management
  ├── pages/
  │   ├── Login.tsx              # Login page
  │   ├── Signup.tsx             # Student signup page
  │   ├── ForgotPassword.tsx     # Password reset page
  │   ├── StudentDashboard.tsx   # Student dashboard
  │   ├── TeacherDashboard.tsx   # Teacher dashboard
  │   └── AdminDashboard.tsx     # Admin dashboard
  ├── utils/
  │   ├── api.ts                 # API client and auth endpoints
  │   ├── config.ts              # App configuration (email domain)
  │   └── validators.ts          # Email and password validation
  └── App.tsx                    # Main app with routing

shared/
  └── schema.ts                  # TypeScript types and Zod schemas

server/
  ├── routes.ts                  # API route handlers (to be implemented)
  └── storage.ts                 # In-memory storage interface
```

## Configuration

### Email Domain Validation
The allowed college email domain can be changed in `client/src/utils/config.ts`:
```typescript
allowedEmailDomain: "@college.edu"  // Change this to your institution's domain
```

### Password Requirements
Password validation rules in `client/src/utils/config.ts`:
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

## API Endpoints (To Be Implemented)
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - Student registration
- `POST /api/auth/forgot-password` - Password reset request

## Design System
- **Colors**: Blue and purple gradient theme
- **Typography**: Inter and DM Sans fonts
- **Spacing**: Consistent 8px grid system
- **Components**: Custom-designed with accessibility in mind
- **Animations**: Smooth page transitions and micro-interactions

## User Flows

### Login Flow
1. User selects role (Student/Teacher/Admin)
2. Enters email and password
3. Submits form
4. Redirects to role-specific dashboard

### Signup Flow (Students Only)
1. User enters full name
2. Enters college email (validated against domain)
3. Creates password with strength feedback
4. Confirms password
5. Redirects to login page on success

### Forgot Password Flow
1. User enters email
2. System simulates sending reset link (2-3 seconds)
3. Success confirmation displayed

## Authentication State
- Stored in React Context
- Persisted to localStorage
- Includes user info and role
- Protected routes check authentication status

## Next Steps (Backend Integration)
1. Implement backend API endpoints
2. Add password hashing (bcrypt)
3. Integrate real email service for password reset
4. Add JWT token management
5. Implement secure session handling
6. Add refresh token logic

## Recent Changes
- **2025-01-01**: Initial frontend implementation complete
  - All authentication pages designed and functional
  - Role-based routing implemented
  - Form validation and error handling
  - Simulated API integration ready for backend
