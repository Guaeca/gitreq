/**
 * Header Component
 * Main navigation header
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { Button } from '../../design-system/components/index.js';
import { spacing, colors } from '../../design-system/tokens/index.js';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const headerStyles = {
    backgroundColor: colors.neutral[0],
    borderBottom: `2px solid ${colors.neutral[200]}`,
    padding: `${spacing[4]} ${spacing[6]}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const logoStyles = {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: colors.primary[600],
    cursor: 'pointer',
  };

  const navStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[4],
  };

  const userInfoStyles = {
    fontSize: '0.875rem',
    color: colors.neutral[700],
  };

  return (
    <header style={headerStyles}>
      <div style={logoStyles} onClick={() => navigate('/dashboard')}>
        GitReq
      </div>
      {user && (
        <nav style={navStyles}>
          <span style={userInfoStyles}>{user.name}</span>
          <Button variant="outline" size="small" onClick={handleLogout}>
            Logout
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Header;
