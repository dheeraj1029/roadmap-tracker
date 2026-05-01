import { useState } from 'react';
import ThemeToggle from '../common/ThemeToggle.jsx';
import { getUsers, saveUsers } from '../../utils/storage.js';
import './AuthPage.css';

const emptyForm = {
  name: '',
  email: '',
  password: '',
};

function AuthPage({ theme, onLogin, onToggleTheme }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isSignup = mode === 'signup';

  function updateField(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function switchMode(nextMode) {
    setMode(nextMode);
    setMessage('');
    setForm(emptyForm);
    setShowPassword(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const email = form.email.trim().toLowerCase();
    const password = form.password.trim();
    const users = getUsers();

    if (!email || !password || (isSignup && !form.name.trim())) {
      setMessage('Please fill in all required fields.');
      return;
    }

    if (isSignup) {
      const userExists = users.some((user) => user.email === email);

      if (userExists) {
        setMessage('An account with this email already exists.');
        return;
      }

      const newUser = {
        name: form.name.trim(),
        email,
        password,
      };

      saveUsers([...users, newUser]);
      onLogin({ name: newUser.name, email: newUser.email });
      return;
    }

    const matchingUser = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (!matchingUser) {
      setMessage('Invalid email or password.');
      return;
    }

    onLogin({ name: matchingUser.name, email: matchingUser.email });
  }

  return (
    <main className="auth-page">
      <div className="auth-theme-toggle">
        <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />
      </div>

      <div className="auth-orb auth-orb-large" />
      <div className="auth-orb auth-orb-left" />
      <div className="auth-orb auth-orb-right" />
      <div className="auth-orb auth-orb-bottom" />

      <section className="auth-card" aria-label="Authentication form">
        <div className="auth-tabs" aria-label="Choose authentication mode">
          <button
            className={mode === 'login' ? 'active' : ''}
            type="button"
            onClick={() => switchMode('login')}
          >
            Login
          </button>
          <button
            className={mode === 'signup' ? 'active' : ''}
            type="button"
            onClick={() => switchMode('signup')}
          >
            Signup
          </button>
        </div>

        <h1>{isSignup ? 'SIGN UP' : 'LOGIN'}</h1>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <label>
              Full name
              <input
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={updateField}
                autoComplete="name"
              />
            </label>
          )}

          <label>
            Email address
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={updateField}
              autoComplete="email"
            />
          </label>

          <label>
            Password
            <span className="password-field">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={form.password}
                onChange={updateField}
                autoComplete={isSignup ? 'new-password' : 'current-password'}
              />
              <button
                className="password-toggle"
                type="button"
                onClick={() => setShowPassword((currentValue) => !currentValue)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  height="20"
                  viewBox="0 0 24 24"
                  width="20"
                >
                  <path
                    d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  />
                </svg>
              </button>
            </span>
          </label>

          <div className="auth-options">
            <label className="remember-row">
              <input type="checkbox" defaultChecked />
              Remember me
            </label>
            <button className="link-button" type="button">
              Forgot password?
            </button>
          </div>

          {message && <p className="auth-message">{message}</p>}

          <button className="auth-submit" type="submit">
            {isSignup ? 'CREATE ACCOUNT' : 'SIGN IN'}
          </button>
        </form>
      </section>
    </main>
  );
}

export default AuthPage;
