/**
 * Register Page
 * Page for user registration
 */

import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm.jsx';
import { spacing, colors } from '../design-system/tokens/index.js';

const RegisterPage = () => {
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
      <RegisterForm />
      <div style={linkStyles}>
        Already have an account?{' '}
        <Link to="/login" style={linkTextStyles}>
          Login here
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
