/**
 * Dashboard Page
 * Main dashboard showing user's projects
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header.jsx';
import ProjectList from '../components/projects/ProjectList.jsx';
import { Button } from '../design-system/components/index.js';
import { spacing, colors } from '../design-system/tokens/index.js';

const DashboardPage = () => {
  const navigate = useNavigate();

  const containerStyles = {
    minHeight: '100vh',
    backgroundColor: colors.neutral[50],
  };

  const contentStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: spacing[6],
  };

  const headerSectionStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[6],
  };

  const titleStyles = {
    fontSize: '2rem',
    fontWeight: 700,
    color: colors.neutral[900],
  };

  return (
    <div style={containerStyles}>
      <Header />
      <div style={contentStyles}>
        <div style={headerSectionStyles}>
          <h1 style={titleStyles}>My Projects</h1>
          <Button onClick={() => navigate('/projects/new')}>
            Create New Project
          </Button>
        </div>
        <ProjectList />
      </div>
    </div>
  );
};

export default DashboardPage;
