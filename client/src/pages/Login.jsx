
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

function Login() {

  
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { saveLogin } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  
  function change(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

 
  async function submit(e) {

    e.preventDefault();
    setError('');
    setLoading(true);

    try {

      const response = await api.post('/auth/login', form);

      
      saveLogin(response.data);

     
      const previousPage = location.state?.from || '/';

      navigate(previousPage);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        'Login failed. Please try again.'
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">

      <div className="auth-card">

        <span className="eyebrow">
          WELCOME BACK
        </span>

        <h1>Good to see you.</h1>

        <p className="muted">
          Log in to view your orders and continue shopping.
        </p>

        {/* Display error message */}
        {error && (
          <div className="notice error">
            {error}
          </div>
        )}

       
        <form onSubmit={submit} className="form-stack">

          <label>
            Email Address

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={change}
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={change}
              required
              minLength="6"
              autoComplete="current-password"
              placeholder="Enter your password"
            />
          </label>

          <button
            type="submit"
            className="primary-button full-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>

        </form>

        <p className="auth-switch">
          New here? <Link to="/register">Create an account</Link>
        </p>

      </div>

    </section>
  );
}

export default Login;
