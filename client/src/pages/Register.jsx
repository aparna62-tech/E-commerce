
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

function Register() {

 
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { saveLogin } = useAuth();
  const navigate = useNavigate();

  
  function change(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

 
  async function submit(e) {

    e.preventDefault();
    setError('');

    
    if (form.password !== form.confirmPassword) {
      setError('The passwords do not match.');
      return;
    }

    setLoading(true);

    try {

     
      const response = await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password
      });

    
      saveLogin(response.data);

      
      navigate('/');

    } catch (err) {

      setError(
        err.response?.data?.message ||
        'Could not create your account.'
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">

      <div className="auth-card">

        <span className="eyebrow">
          JOIN SHOEASE
        </span>

        <h1>Create an account.</h1>

        <p className="muted">
          A few details and you are ready to shop.
        </p>

       
        {error && (
          <div className="notice error">
            {error}
          </div>
        )}

        
        <form onSubmit={submit} className="form-stack">

          <label>
            Full Name

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={change}
              required
              minLength="2"
              placeholder="Your name"
            />
          </label>

          <label>
            Email Address

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={change}
              required
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
              placeholder="At least 6 characters"
            />
          </label>

          <label>
            Confirm Password

            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={change}
              required
              minLength="6"
              placeholder="Enter password again"
            />
          </label>

          <button
            type="submit"
            className="primary-button full-button"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

        </form>

        <p className="auth-switch">
          Already registered? <Link to="/login">Log in</Link>
        </p>

      </div>
    </section>
  );
}

export default Register;
