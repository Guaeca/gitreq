/**
 * Design System - Card Component
 * Container component for grouped content
 */

import React from 'react';
import { colors, spacing, borderRadius, shadows } from '../tokens/index.js';

const Card = ({
  children,
  padding = 'medium',
  elevation = 'base',
  onClick,
  hoverable = false,
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const paddingStyles = {
    small: spacing[4],
    medium: spacing[6],
    large: spacing[8],
  };

  const cardStyles = {
    backgroundColor: colors.neutral[0],
    borderRadius: borderRadius.lg,
    boxShadow: shadows[elevation],
    padding: paddingStyles[padding],
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.2s ease',
    border: `1px solid ${colors.neutral[200]}`,
    transform: hoverable && isHovered ? 'translateY(-2px)' : 'none',
    boxShadow: hoverable && isHovered ? shadows.lg : shadows[elevation],
  };

  return (
    <div
      style={cardStyles}
      onClick={onClick}
      onMouseEnter={() => hoverable && setIsHovered(true)}
      onMouseLeave={() => hoverable && setIsHovered(false)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
