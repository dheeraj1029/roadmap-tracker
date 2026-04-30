import { useState } from 'react';
import { getUsers, saveUsers } from '../../utils/storage.js';
import './AuthPage.css';

const emptyForm = {
  name: '',
  email: '',
  password: '',
};

function AuthPage({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState('');

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
              value={form.email}
              onChange={updateField}
              autoComplete="email"
            />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={updateField}
              autoComplete={isSignup ? 'new-password' : 'current-password'}
            />
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
