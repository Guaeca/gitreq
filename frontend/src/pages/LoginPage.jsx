/**
 * Login Page
 * Page for user login
 */

import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm.jsx';
import { spacing, colors } from '../design-system/tokens/index.js';

const LoginPage = () => {
  const containerStyles = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral[50],
    padding: spacing[6],
  };

  const linkStyles = {
    marginTop: spacing[4],
    textAlign: 'center',
    fontSize: '0.875rem',
  };

  const linkTextStyles = {
    color: colors.primary[600],
    textDecoration: 'none',
    fontWeight: 500,
  };

  return (
    <div style={containerStyles}>
      <LoginForm />
      <div style={linkStyles}>
        Don't have an account?{' '}
        <Link to="/register" style={linkTextStyles}>
          Register here
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
