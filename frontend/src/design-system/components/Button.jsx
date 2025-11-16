/**
 * Design System - Button Component
 * Base button component with variants
 */

import React from 'react';
import { colors, spacing, borderRadius, shadows, transitions } from '../tokens/index.js';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) => {
  const baseStyles = {
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: 500,
    borderRadius: borderRadius.md,
    transition: transitions.base,
    fontFamily: 'inherit',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
  };

  const variantStyles = {
    primary: {
      backgroundColor: colors.primary[600],
      color: colors.neutral[0],
      boxShadow: shadows.sm,
    },
    secondary: {
      backgroundColor: colors.neutral[200],
      color: colors.neutral[900],
      boxShadow: shadows.sm,
    },
    outline: {
      backgroundColor: 'transparent',
      color: colors.primary[600],
      border: `2px solid ${colors.primary[600]}`,
    },
    danger: {
      backgroundColor: colors.error.main,
      color: colors.neutral[0],
      boxShadow: shadows.sm,
    },
  };

  const sizeStyles = {
    small: {
      padding: `${spacing[2]} ${spacing[4]}`,
      fontSize: '0.875rem',
    },
    medium: {
      padding: `${spacing[3]} ${spacing[6]}`,
      fontSize: '1rem',
    },
    large: {
      padding: `${spacing[4]} ${spacing[8]}`,
      fontSize: '1.125rem',
    },
  };

  const hoverStyles = !disabled ? {
    primary: { backgroundColor: colors.primary[700] },
    secondary: { backgroundColor: colors.neutral[300] },
    outline: { backgroundColor: colors.primary[50] },
    danger: { backgroundColor: colors.error.dark },
  }[variant] : {};

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        ...sizeStyles[size],
        ...(isHovered ? hoverStyles : {}),
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
