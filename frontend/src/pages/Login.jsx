import { useState } from 'react'
import Career3D from '../Career3D'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (event) => {
  event.preventDefault()

  const form = event.currentTarget

  const email = form
    .querySelector('#login-email')
    .value

  const password = form
    .querySelector('#login-password')
    .value

  try {
    const response = await fetch(
      'http://127.0.0.1:8000/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      },
    )

    const data = await response.json()

    if (!response.ok) {
      alert(
        data.detail ||
        'Login failed.',
      )

      return
    }

    console.log(
      'Login successful:',
      data,
    )

    window.location.href = '/'
  } catch (error) {
    console.error(
      'Login error:',
      error,
    )

    alert(
      'Unable to connect to CareerAI backend. Please make sure the backend is running.',
    )
  }
}

  return (
    <div className="login-page">
      <Career3D />

      <div className="login-page-overlay" />

      <header className="login-topbar">
        <a href="/" className="login-brand">
          <div className="login-brand-mark">AI</div>

          <div>
            <div className="login-brand-name">CareerAI</div>
            <div className="login-brand-subtitle">
              Engineering Intelligence
            </div>
          </div>
        </a>

        <div className="login-topbar-text">
          New to CareerAI?
          <button type="button">Create account</button>
        </div>
      </header>

      <main className="login-main">
        <section className="login-card">

          <div className="login-card-header">
            <div className="login-status">
              <span />
              CAREER INTELLIGENCE PLATFORM
            </div>

            <h1>Welcome back.</h1>

            <p>
              Sign in to continue building your engineering career
              intelligently.
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>

            <label htmlFor="login-email">
              Email address
            </label>

            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />

            <div className="login-password-label">
              <label htmlFor="login-password">
                Password
              </label>

              <button
                type="button"
                className="forgot-password"
              >
                Forgot password?
              </button>
            </div>

            <div className="login-password-wrapper">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <button
              type="submit"
              className="login-submit"
            >
              <span>Log in to CareerAI</span>
              <span className="login-submit-arrow">→</span>
            </button>

          </form>

          <div className="login-divider">
            <span>OR</span>
          </div>

          <button
            type="button"
            className="login-create-button"
            onClick={() => {
              window.location.href = '/signup'
           }}
          >
            Create a new CareerAI account
          </button>

          <p className="login-terms">
            By continuing, you agree to CareerAI's Terms of Service
            and Privacy Policy.
          </p>

        </section>
      </main>

      <footer className="login-footer">
        <span>© 2026 CareerAI</span>
        <span>Built for the engineering community</span>
      </footer>
    </div>
  )
}