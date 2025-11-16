/**
 * Design System - Input Component
 * Base input component for text fields
 */

import React from 'react';
import { colors, spacing, borderRadius, transitions } from '../tokens/index.js';

const Input = ({
  type = 'text',
  label,
  error,
  fullWidth = false,
  disabled = false,
  placeholder,
  value,
  onChange,
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],
    width: fullWidth ? '100%' : 'auto',
  };

  const labelStyles = {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: colors.neutral[700],
  };

  const inputStyles = {
    padding: `${spacing[3]} ${spacing[4]}`,
    fontSize: '1rem',
    border: `2px solid ${
      error
        ? colors.error.main
        : isFocused
        ? colors.primary[500]
        : colors.neutral[300]
    }`,
    borderRadius: borderRadius.md,
    backgroundColor: disabled ? colors.neutral[100] : colors.neutral[0],
    color: colors.neutral[900],
    transition: transitions.base,
    outline: 'none',
    fontFamily: 'inherit',
    width: '100%',
  };

  const errorStyles = {
    fontSize: '0.875rem',
    color: colors.error.main,
    marginTop: spacing[1],
  };

  return (
    <div style={containerStyles}>
      {label && <label style={labelStyles}>{label}</label>}
      <input
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={inputStyles}
        {...props}
      />
      {error && <span style={errorStyles}>{error}</span>}
    </div>
  );
};

export default Input;
