const baseUrl = process.env.BACKEND_BASE_URL || "http://127.0.0.1:5000"

async function readJson(response) {
  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    const message = payload?.message || `Request failed with status ${response.status}`
    throw new Error(message)
  }

  return payload
}

async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  })

  return readJson(response)
}

async function run() {
  const health = await request("/api/health")
  const login = await request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: "john@example.com",
      password: "Password123",
    }),
  })

  console.log("Smoke test passed")
  console.log(
    JSON.stringify(
      {
        service: health.data?.service,
        backendOk: health.ok === true,
        loginOk: login.ok === true,
        redirectTo: login.data?.redirectTo,
        userEmail: login.data?.user?.email,
      },
      null,
      2,
    ),
  )
}

run().catch((error) => {
  console.error("Smoke test failed")
  console.error(error.message)
  process.exitCode = 1
})
