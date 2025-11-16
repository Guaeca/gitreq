/**
 * Register Form Component
 * Handles user registration
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { Button, Input, Card } from '../../design-system/components/index.js';
import { spacing, colors } from '../../design-system/tokens/index.js';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
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

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...userData } = formData;
      await register(userData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
      <h2 style={titleStyles}>Register for GitReq</h2>
      <form onSubmit={handleSubmit} style={formStyles}>
        {error && <div style={errorStyles}>{error}</div>}

        <Input
          type="text"
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
        />

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
          placeholder="Enter your password (min. 8 characters)"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
        />

        <Input
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          fullWidth
          required
        />

        <Button type="submit" fullWidth disabled={loading}>
          {loading ? 'Creating Account...' : 'Register'}
        </Button>
      </form>
    </Card>
  );
};

export default RegisterForm;
