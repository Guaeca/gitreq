/**
 * Login Form Component
 * Handles user login
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { Button, Input, Card } from '../../design-system/components/index.js';
import { spacing, colors } from '../../design-system/tokens/index.js';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4],
    maxWidth: '400px',
    margin: '0 auto',
  };

  const titleStyles = {
    fontSize: '2rem',
    fontWeight: 600,
    color: colors.neutral[900],
    marginBottom: spacing[2],
    textAlign: 'center',
  };

  const errorStyles = {
    backgroundColor: colors.error.light,
    color: colors.neutral[0],
    padding: spacing[3],
    borderRadius: '4px',
    fontSize: '0.875rem',
  };

  return (
    <Card padding="large">
      <h2 style={titleStyles}>Login to GitReq</h2>
      <form onSubmit={handleSubmit} style={formStyles}>
        {error && <div style={errorStyles}>{error}</div>}

        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
        />

        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
        />

        <Button type="submit" fullWidth disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </Card>
  );
};

export default LoginForm;
