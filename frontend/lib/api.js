const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""
const AUTH_STORAGE_KEY = "student-portal-auth"

async function readJson(response) {
  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    const message = payload?.message || `Request failed with status ${response.status}`
    throw new Error(message)
  }

  return payload?.data ?? payload
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  })

  return readJson(response)
}

export function getStoredAuth() {
  if (typeof window === "undefined") {
    return null
  }

  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY)
  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw)
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }
}

export function storeAuthSession(session) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
  }

  return session
}

export function clearAuthSession() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
  }
}

export async function getBackendHealth() {
  return apiRequest("/api/health")
}

export async function loginUser(credentials) {
  return apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  })
}

export async function registerUser(payload) {
  return apiRequest("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export async function requestPasswordReset(payload) {
  return apiRequest("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export async function getStudentDashboard() {
  return apiRequest("/api/dashboard/student")
}

export async function getAdminDashboard() {
  return apiRequest("/api/dashboard/admin")
}

export async function getUsers(params = {}) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== ""),
  )

  return apiRequest(`/api/users${query.toString() ? `?${query.toString()}` : ""}`)
}

export async function createUser(payload) {
  return apiRequest("/api/users", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export async function getCourses(params = {}) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== ""),
  )

  return apiRequest(`/api/courses${query.toString() ? `?${query.toString()}` : ""}`)
}

export async function getAssignments(params = {}) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== ""),
  )

  return apiRequest(`/api/assignments${query.toString() ? `?${query.toString()}` : ""}`)
}

export async function submitAssignment(id, files = []) {
  return apiRequest(`/api/assignments/${id}/submit`, {
    method: "POST",
    body: JSON.stringify({
      files: files.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      })),
    }),
  })
}

export async function getForumPosts(params = {}) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== ""),
  )

  return apiRequest(`/api/forum/posts${query.toString() ? `?${query.toString()}` : ""}`)
}

export async function createForumPost(payload) {
  return apiRequest("/api/forum/posts", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export async function getLeaderboard() {
  return apiRequest("/api/leaderboard")
}

export async function getCertificates(params = {}) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== ""),
  )

  return apiRequest(`/api/certificates${query.toString() ? `?${query.toString()}` : ""}`)
}

export async function getChatConversations() {
  return apiRequest("/api/chat/conversations")
}

export async function sendChatMessage(message) {
  return apiRequest("/api/chat/message", {
    method: "POST",
    body: JSON.stringify({ message }),
  })
}
