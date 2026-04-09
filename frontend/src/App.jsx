import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "@/app/page.jsx"
import ChatbotPage from "@/app/chatbot/page.jsx"
import AdminDashboardPage from "@/app/admin/page.jsx"
import AdminUsersPage from "@/app/admin/users/page.jsx"
import LoginPage from "@/app/auth/login/page.jsx"
import RegisterPage from "@/app/auth/register/page.jsx"
import ForgotPasswordPage from "@/app/auth/forgot-password/page.jsx"
import StudentDashboardPage from "@/app/student/page.jsx"
import StudentAssignmentsPage from "@/app/student/assignments/page.jsx"
import StudentCertificatesPage from "@/app/student/certificates/page.jsx"
import StudentCoursesPage from "@/app/student/courses/page.jsx"
import StudentForumPage from "@/app/student/forum/page.jsx"
import StudentLeaderboardPage from "@/app/student/leaderboard/page.jsx"
import PlaceholderPage from "@/src/placeholder-page.jsx"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chatbot" element={<ChatbotPage />} />
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/admin/users" element={<AdminUsersPage />} />
      <Route path="/admin/courses" element={<PlaceholderPage role="admin" title="Courses" />} />
      <Route path="/admin/assignments" element={<PlaceholderPage role="admin" title="Assignments" />} />
      <Route path="/admin/certificates" element={<PlaceholderPage role="admin" title="Certificates" />} />
      <Route path="/admin/reports" element={<PlaceholderPage role="admin" title="Reports" />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/student" element={<StudentDashboardPage />} />
      <Route path="/student/assignments" element={<StudentAssignmentsPage />} />
      <Route path="/student/certificates" element={<StudentCertificatesPage />} />
      <Route path="/student/courses" element={<StudentCoursesPage />} />
      <Route path="/student/forum" element={<StudentForumPage />} />
      <Route path="/student/leaderboard" element={<StudentLeaderboardPage />} />
      <Route path="/teacher" element={<PlaceholderPage role="teacher" title="Teacher Dashboard" />} />
      <Route path="/teacher/classes" element={<PlaceholderPage role="teacher" title="Classes" />} />
      <Route path="/teacher/grading" element={<PlaceholderPage role="teacher" title="Grading" />} />
      <Route path="/teacher/quizzes" element={<PlaceholderPage role="teacher" title="Quizzes" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
