# EduLearn - Create by TK Student Portal

A comprehensive, full-stack educational platform built with modern web technologies. EduLearn provides an interactive learning experience with gamification, AI-powered recommendations, and community features.

**Version:** 0.1.0  
**Last Updated:** April 2026

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Project Architecture](#project-architecture)
3. [Folder Structure](#folder-structure)
4. [Tech Stack](#tech-stack)
5. [Setup & Installation](#setup--installation)
6. [Running the Application](#running-the-application)
7. [API Documentation](#api-documentation)
8. [Features](#features)
9. [Project Components](#project-components)

---

## Overview

EduLearn is a monorepo containing a full-stack student learning platform with:

- **Interactive Courses** - Rich multimedia content with quizzes and exercises
- **AI-Powered Learning** - Personalized recommendations and instant AI assistance
- **Gamification** - XP, badges, and leaderboards to boost engagement
- **Certifications** - Blockchain-based NFT certificates for completed courses
- **Community** - Forums for peer-to-peer learning and support
- **Live Sessions** - Real-time classes, quizzes, and Q&A
- **Multi-role Support** - Students, Teachers, and Admin dashboards

---

## Project Architecture

The project follows a **monorepo structure** with workspaces:

```
v0-student-portal-ui/
├── frontend/          # Vite + React UI application
├── backend/           # Express.js API server
├── node_modules/      # Shared dependencies
├── package.json       # Root workspace configuration
└── README.md          # This file
```

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Browser                           │
├─────────────────────────────────────────────────────────────┤
│  React + Vite (frontend/)                                    │
│  ├─ Pages (app/)                                             │
│  ├─ Components (components/)                                 │
│  ├─ Utilities (lib/, hooks/)                                 │
│  └─ Styles (styles/)                                         │
├─────────────────────────────────────────────────────────────┤
│  HTTP/REST API Proxy (:5173 -> :5000)                        │
├─────────────────────────────────────────────────────────────┤
│  Express Server (backend/)                                   │
│  ├─ Routes: auth, courses, assignments, etc.                 │
│  ├─ Mock Data Storage                                        │
│  └─ CORS-enabled (:5000)                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Folder Structure

### Root Level

```
v0-student-portal-ui/
├── .git/                      # Git repository
├── backend/                   # Express API server
├── frontend/                  # Vite + React application
├── node_modules/              # Installed dependencies
├── .gitignore                 # Git ignore rules
├── package.json               # Workspace root config
├── package-lock.json          # Dependency lock file
└── README.md                  # Project documentation
```

### Frontend (`frontend/`)

```
frontend/
├── app/                       # Next.js-style file-based routing
│   ├── globals.css            # Global styles
│   ├── layout.jsx             # Root layout component
│   ├── page.jsx               # Homepage
│   │
│   ├── admin/                 # Admin role pages
│   │   ├── page.jsx           # Admin dashboard
│   │   └── users/
│   │       └── page.jsx       # User management
│   │
│   ├── auth/                  # Authentication pages
│   │   ├── login/
│   │   │   └── page.jsx
│   │   ├── register/
│   │   │   └── page.jsx
│   │   └── forgot-password/
│   │       └── page.jsx
│   │
│   ├── chatbot/               # AI Chatbot
│   │   └── page.jsx
│   │
│   ├── student/               # Student role pages
│   │   ├── page.jsx           # Student dashboard
│   │   ├── assignments/
│   │   │   └── page.jsx       # View/submit assignments
│   │   ├── certificates/
│   │   │   └── page.jsx       # View certificates
│   │   ├── courses/
│   │   │   └── page.jsx       # Course catalog & enrollment
│   │   ├── forum/
│   │   │   └── page.jsx       # Discussion forums
│   │   └── leaderboard/
│   │       └── page.jsx       # Rankings & scores
│   │
│   └── teacher/               # Teacher role pages (placeholder)
│       ├── page.jsx
│       ├── classes/
│       ├── grading/
│       └── quizzes/
│
├── components/                # Reusable React components
│   ├── assignments/
│   │   └── assignment-card.jsx
│   │
│   ├── certificates/
│   │   └── certificate-card.jsx
│   │
│   ├── chatbot/
│   │   └── chat-widget.jsx   # AI chat interface
│   │
│   ├── dashboard/            # Dashboard-specific components
│   │   ├── attendance-chart.jsx
│   │   ├── course-activity.jsx
│   │   ├── dashboard-stats.jsx
│   │   ├── performance-card.jsx
│   │   └── upcoming-events.jsx
│   │
│   ├── forum/
│   │   └── forum-post-card.jsx
│   │
│   ├── layouts/              # Layout wrappers
│   │   ├── auth-layout.jsx
│   │   └── dashboard-layout.jsx
│   │
│   ├── leaderboard/          # Leaderboard components
│   │   ├── badge-card.jsx
│   │   ├── leaderboard-table.jsx
│   │   └── xp-progress.jsx
│   │
│   ├── recommendation/       # AI recommendations
│   │   └── ai-recommendation-card.jsx
│   │
│   ├── shared/               # Shared utility components
│   │   └── backend-status.jsx
│   │
│   └── ui/                   # Base UI components (Shadcn)
│       ├── accordion.jsx
│       ├── alert.jsx
│       ├── badge.jsx
│       ├── button.jsx
│       ├── card.jsx
│       ├── dialog.jsx
│       ├── dropdown-menu.jsx
│       ├── form.jsx
│       ├── input.jsx
│       ├── select.jsx
│       ├── table.jsx
│       ├── tabs.jsx
│       ├── textarea.jsx
│       ├── toast.jsx
│       ├── tooltip.jsx
│       └── ... (25+ more UI components)
│
├── hooks/                     # Custom React hooks
│   ├── use-mobile.js         # Mobile detection
│   └── use-toast.js          # Toast notifications
│
├── lib/                       # Utility functions
│   ├── api.js                # API client & endpoints
│   └── utils.js              # Helper functions
│
├── public/                    # Static assets
│
├── src/                       # Source entry point
│   ├── App.jsx               # Route definitions
│   ├── main.jsx              # React DOM render
│   ├── placeholder-page.jsx  # Placeholder component
│   └── shims/                # Polyfills/shims
│
├── styles/                    # Global stylesheets
│   └── globals.css
│
├── tools/                     # Build & migration tools
│   └── migrate-to-js.cjs     # JS migration script
│
├── components.json            # Shadcn configuration
├── index.html                 # HTML entry point
├── jsconfig.json             # JavaScript config with path aliases
├── package.json              # Frontend dependencies
├── postcss.config.mjs         # PostCSS configuration
├── vite.config.js            # Vite build configuration
└── README.md                 # Frontend-specific docs
```

### Backend (`backend/`)

```
backend/
├── src/
│   ├── server.js             # Express server & API routes
│   └── smoke-test.mjs        # Smoke test suite
│
├── package.json              # Backend dependencies
└── node_modules/             # Backend packages
```

---

## Tech Stack

### Frontend
- **Framework:** React 19.2.4
- **Build Tool:** Vite 7.1.7
- **Router:** React Router 7.9.3
- **UI Components:** Shadcn (Radix UI + Tailwind)
- **Styling:** Tailwind CSS 4.2.2
- **Charts:** Recharts 2.15.0
- **Forms:** React Hook Form 7.54.1 + Zod
- **Notifications:** Sonner (toast library)
- **Icons:** Lucide React 0.564.0
- **Date Handling:** date-fns 4.1.0

### Backend
- **Runtime:** Node.js (ES Modules)
- **Server:** Express.js 5.1.0
- **CORS:** cors 2.8.5
- **Environment:** dotenv 16.6.1

### Development
- **Package Manager:** npm
- **Monorepo:** npm workspaces
- **Version Control:** Git

---

## Setup & Installation

### Prerequisites
- Node.js 16+ and npm 8+
- Git

### Installation Steps

```bash
# Clone the repository
git clone https://github.com/yourusername/v0-student-portal-ui.git
cd v0-student-portal-ui

# Install root dependencies
npm install

# This automatically installs both frontend and backend dependencies
# via npm workspaces
```

### Environment Configuration

#### Backend (`.env` or default settings)
```bash
# .env (optional)
PORT=5000
CORS_ORIGIN=http://localhost:5173,http://localhost:5000
NODE_ENV=development
```

#### Frontend (Vite auto-configuration)
- Vite proxy: `/api` requests → `http://localhost:5000`
- API base: `import.meta.env.VITE_API_BASE_URL` (defaults to `""` for relative paths)

---

## Running the Application

### Development Mode

#### Option 1: Run both frontend and backend
```bash
# In separate terminal windows:

# Terminal 1: Start backend (listens on :5000)
npm run dev:backend

# Terminal 2: Start frontend (listens on :5173)
npm run dev:frontend
```

#### Option 2: Run frontend only (backend must be running separately)
```bash
npm run dev
```

#### Option 3: Run backend only
```bash
npm run dev:backend
```

### Frontend Development URLs
- **Homepage:** http://localhost:5173
- **Admin Dashboard:** http://localhost:5173/admin
- **Student Dashboard:** http://localhost:5173/student
- **Login:** http://localhost:5173/auth/login

### Production Build

```bash
# Build the frontend
npm run build

# Output: frontend/dist/

# Backend (runs as-is with Node.js)
npm run start:backend
```

### Smoke Testing

```bash
# Test backend API endpoints
npm run --workspace backend smoke
```

---

## API Documentation

### Base URL
- **Development:** `http://localhost:5000`
- **Frontend Proxy:** `/api` → backend

### Authentication Endpoints

#### POST `/api/auth/login`
```json
{
  "email": "emma@example.com",
  "password": "Password123"
}
```
Returns: User object + session token

#### POST `/api/auth/register`
```json
{
  "name": "New User",
  "email": "newuser@example.com",
  "password": "SecurePass123"
}
```

#### POST `/api/auth/forgot-password`
```json
{
  "email": "user@example.com"
}
```

### Dashboard Endpoints

#### GET `/api/dashboard/student`
Returns student dashboard data (stats, performance, upcoming events)

#### GET `/api/dashboard/admin`
Returns admin dashboard data (analytics, distribution, recent activity)

### Courses Endpoints

#### GET `/api/courses`
Query Parameters:
- `q` - Search by title, instructor, category
- `status` - Filter by status (available, enrolled, completed)
- `category` - Filter by course category

Returns: `{ courses: [], categories: [] }`

#### GET `/api/assignments`
Returns assignments with optional status and search filtering

#### GET `/api/leaderboard`
Returns ranked students with XP and badges

#### GET `/api/certificates`
Returns certificates by course name with filtering

### Users Endpoints

#### GET `/api/users`
Query Parameters:
- `role` - Filter by role (student, teacher, admin)
- `status` - Filter by status (active, inactive)
- `q` - Search by name or email

#### POST `/api/users`
Create new user (requires `name`, `email`, `role`)

### Forum Endpoints

#### GET `/api/forum/posts`
Returns forum posts with filtering

#### POST `/api/forum/posts`
Create new forum post

### Chat Endpoints

#### GET `/api/chat/conversations`
Returns chat history

#### POST `/api/chat/message`
Send message to AI chatbot

### Health Check

#### GET `/api/health`
Returns API server status (useful for debugging)

---

## Features

### 🎓 Core Learning
- **Course Catalog** - Browse 1,000+ courses across multiple categories
- **Enrollment** - Enroll in available courses and track progress
- **Progress Tracking** - Real-time lesson completion tracking
- **Assignments** - Submit and track assignment submissions

### 🏆 Gamification
- **XP System** - Earn points for completing lessons and assignments
- **Badges** - Unlock achievement badges (e.g., "Complete 10 Courses")
- **Leaderboard** - Rank against other students globally
- **Streaks** - Track consecutive days of learning

### 🎖️ Credentials
- **Certificates** - Earn verifiable completion certificates
- **NFT Integration** - Blockchain-based certificate verification

### 🤖 AI Features
- **AI Assistant** - Ask questions and get instant help
- **Personalized Recommendations** - Get course suggestions based on profile
- **Learning Suggestions** - Get tailored study tips and resources

### 👥 Community
- **Discussion Forums** - Post questions and share knowledge
- **Peer Support** - Get help from community members
- **Announcements** - Stay updated with course announcements

### 📊 Analytics & Dashboards
- **Student Dashboard** - View progress, upcoming events, course activity
- **Admin Dashboard** - Monitor users, courses, and performance metrics
- **Performance Cards** - Visual performance indicators
- **Charts & Graphs** - Statistical visualizations

### 👨‍💼 Multi-Role Support
- **Student** - Learn, track progress, earn credentials
- **Teacher** - Manage classes, create quizzes, grade assignments
- **Admin** - Manage users, courses, monitor platform health

---

## Project Components

### Key Pages

| Page | Route | Role | Purpose |
|------|-------|------|---------|
| Homepage | `/` | Public | Landing page with features & pricing |
| Login | `/auth/login` | Public | User authentication |
| Register | `/auth/register` | Public | New user signup |
| Student Dashboard | `/student` | Student | Main learning hub |
| My Courses | `/student/courses` | Student | Browse & manage enrolled courses |
| Assignments | `/student/assignments` | Student | View & submit assignments |
| Certificates | `/student/certificates` | Student | View earned certificates |
| Forums | `/student/forum` | Student | Discussion forums |
| Leaderboard | `/student/leaderboard` | Student | Rankings & scores |
| Chatbot | `/chatbot` | All | AI assistance |
| Admin Dashboard | `/admin` | Admin | Platform analytics |
| User Management | `/admin/users` | Admin | Manage users |

### Key Features

**Frontend:**
- File-based routing (similar to Next.js)
- Responsive design with Tailwind CSS
- Client-side state with React hooks
- Mock data for development (defaultCourses, defaultUsers, etc.)
- API integration with error handling

**Backend:**
- REST API with Express.js
- Mock data storage (no database)
- CORS support for cross-origin requests
- Filtering and search capabilities
- Health check endpoint

---

## Development Workflow

### Adding a New Course
1. Add course object to `backend/src/server.js` courses array
2. Frontend fetches via `getCourses()` in `frontend/lib/api.js`
3. Display in `frontend/app/student/courses/page.jsx`

### Adding a New API Endpoint
1. Create route in `backend/src/server.js`
2. Add corresponding function in `frontend/lib/api.js`
3. Use function in your React component
4. Handle loading/error states

### Styling Guidelines
- Use Tailwind CSS utility classes
- Import Shadcn components from `@/components/ui/`
- Follow the dark mode theme (pre-configured)
- Maintain consistent spacing with Tailwind's spacing scale

### File Organization
- Keep pages in `app/` directory
- Extract reusable components to `components/`
- Utility functions in `lib/`
- Custom hooks in `hooks/`

---

## Troubleshooting

### Backend not responding
```bash
# Check if backend is running on port 5000
lsof -i :5000

# Restart backend
npm run dev:backend
```

### API requests failing
- Verify backend is running (`npm run dev:backend`)
- Check CORS settings in `backend/src/server.js`
- Review network tab in browser DevTools
- Check API endpoint in `frontend/lib/api.js`

### Module not found errors
```bash
# Verify path aliases in jsconfig.json
# @/* resolves to root frontend directory

# Reinstall dependencies
npm install
```

### Port conflicts
```bash
# Change backend port
PORT=5001 npm run dev:backend

# Update Vite proxy in vite.config.js if needed
```

---

## Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Real-time notifications (WebSockets/Server-Sent Events)
- [ ] Video streaming optimization (HLS/DASH)
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Payment integration (Stripe/PayPal)
- [ ] Advanced search with Elasticsearch
- [ ] Machine learning recommendations
- [ ] Automated grading system

---

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test thoroughly
4. Commit: `git commit -m "Add your feature"`
5. Push: `git push origin feature/your-feature`
6. Open a Pull Request

---

## License

This project is private. All rights reserved.

---

## Support & Contact

For issues, questions, or feedback, please open an issue in the repository or contact the development team.

---

**Happy Learning! 🚀**
