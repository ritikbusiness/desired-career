# Design Guidelines: Desired Career Academy Authentication Module

## Design Approach
**System-Based Approach**: Material Design principles adapted for educational platforms, focusing on clarity, accessibility, and professional presentation. Drawing inspiration from modern LMS platforms like Canvas and Coursera for trust and credibility.

## Core Design Philosophy
Clean, professional authentication experience that conveys trust and institutional quality. Forms should feel approachable yet secure, with clear visual hierarchy guiding users through each step of the authentication process.

## Typography System
- **Headings**: Inter or DM Sans
  - Page titles: text-3xl font-bold (Login, Sign Up, Forgot Password)
  - App branding: text-4xl font-extrabold with subtle gradient effect
  - Section labels: text-sm font-semibold uppercase tracking-wide
- **Body Text**: Inter or System UI
  - Form labels: text-sm font-medium
  - Input text: text-base
  - Helper text/errors: text-xs
  - Success messages: text-sm font-medium

## Layout System
**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Form field spacing: space-y-6
- Section padding: p-8 md:p-12
- Button spacing: px-6 py-3
- Card padding: p-8 md:p-10

**Authentication Card Layout**:
- Max width: max-w-md (448px)
- Centered on viewport: min-h-screen flex items-center justify-center
- Card elevation: shadow-2xl with subtle border
- Background: Full viewport gradient (blue-50 to purple-50)
- Card background: White with rounded-2xl corners

## Component Library

### Input Fields
- Full-width inputs with rounded-lg borders
- Height: h-12 for comfortable touch targets
- Border states:
  - Default: border-2 border-gray-300
  - Focus: border-blue-500 with ring-2 ring-blue-200
  - Error: border-red-500 with ring-2 ring-red-200
  - Success: border-green-500 with ring-2 ring-green-200
- Padding: px-4
- Label positioning: Above input with mb-2
- Error messages: Below input in text-red-600 text-xs mt-1
- Icons: Left-aligned within input (pl-11) for email/password fields using Heroicons

### Role Selector (Login Page)
- Segmented control design with 3 options (Student/Teacher/Admin)
- Grid layout: grid-cols-3 gap-2
- Each segment: 
  - Unselected: bg-gray-100 text-gray-700 border-2 border-transparent
  - Selected: bg-blue-600 text-white border-2 border-blue-700
  - Hover: bg-gray-200 (unselected only)
- Height: h-12
- Rounded corners: rounded-lg
- Smooth transition on selection

### Buttons
**Primary Button (Submit)**:
- Full width: w-full
- Height: h-12
- Background: bg-gradient-to-r from-blue-600 to-purple-600
- Text: text-white font-semibold text-base
- Rounded: rounded-lg
- Hover: Slight scale transform (hover:scale-[1.02])
- Loading state: Disabled opacity with spinner
- Shadow: shadow-lg

**Secondary Button/Links**:
- Text-based links: text-blue-600 hover:text-blue-800 underline
- Font size: text-sm

### Loading Spinner
- Centered inline-block spinner during API calls
- Size: w-5 h-5
- Border-based animation using Tailwind spin
- Displayed next to button text or centered in button

### Toast Notifications
- Position: top-right
- Duration: 4 seconds
- Success: Green background with checkmark icon
- Error: Red background with X icon
- Info: Blue background with info icon
- Include icon from Heroicons (left-aligned)

### Validation Feedback
- Real-time inline validation
- Red border + error text appears immediately
- Green checkmark icon appears on valid input
- Password strength indicator for signup (weak/medium/strong)
- Domain validation message for college email

## Page-Specific Layouts

### Login Page
- App branding at top with gradient text effect
- Tagline below branding: text-gray-600 text-sm
- Role selector as prominent first field
- Email and password inputs
- "Forgot Password?" link (right-aligned, text-sm)
- Primary submit button
- Divider with "New to Desired Career Academy?" text
- "Create an account" link directing to signup

### Signup Page (Students Only)
- Clear heading: "Create Student Account"
- 4-field form: Full Name, College Email, Password, Confirm Password
- Domain requirement notice: bg-blue-50 p-4 rounded-lg mb-6 with info icon
- Password requirements checklist showing real-time validation
- Submit button: "Create Account"
- "Already have an account?" link to login

### Forgot Password Page
- Centered minimal form
- Single email input with prominent email icon
- Explanatory text above: "Enter your email to receive a reset link"
- Submit button: "Send Reset Link"
- Back to login link below
- Success state: Replace form with success message card

## Animations (Framer Motion)
- Page transitions: Fade in with slight upward motion (y: 20 to 0)
- Duration: 0.3s with ease-out
- Form errors: Shake animation (x: [-10, 10, -10, 10, 0])
- Button loading: Pulse animation on spinner
- Success checkmarks: Scale and fade in (scale: 0.8 to 1)

## Responsive Behavior
- Mobile (< 640px): 
  - Card padding: p-6
  - Font sizes reduced by one step
  - Full-width cards with minimal side margins (mx-4)
- Tablet/Desktop (≥ 640px):
  - Centered card with max-w-md
  - Full gradient background
  - Generous padding and spacing

## Images
**No hero images required** - Authentication pages use gradient backgrounds instead of imagery to maintain focus on form completion and security. The app branding and gradient treatment provide sufficient visual interest without distraction.

## Accessibility Requirements
- All inputs have associated labels (for/id relationship)
- Error messages linked via aria-describedby
- Focus visible states on all interactive elements
- Keyboard navigation support throughout
- ARIA roles for role selector (radio group)
- Screen reader announcements for loading states and errors
- Minimum touch target size: 44x44px (h-12 exceeds this)