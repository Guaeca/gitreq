/**
 * Project List Component
 * Displays all projects for the current user
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import projectService from '../../services/projectService.js';
import { Card, Button } from '../../design-system/components/index.js';
import { spacing, colors } from '../../design-system/tokens/index.js';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await projectService.getProjects();
      setProjects(response.data);
    } catch (err) {
      setError('Failed to load projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const containerStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: spacing[4],
    marginTop: spacing[4],
  };

  const projectCardStyles = {
    cursor: 'pointer',
  };

  const projectTitleStyles = {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: colors.neutral[900],
    marginBottom: spacing[2],
  };

  const projectDescStyles = {
    color: colors.neutral[600],
    fontSize: '0.875rem',
  };

  const emptyStateStyles = {
    textAlign: 'center',
    padding: spacing[8],
    color: colors.neutral[600],
  };

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div style={{ color: colors.error.main }}>{error}</div>;
  }

  if (projects.length === 0) {
    return (
      <div style={emptyStateStyles}>
        <p>No projects yet. Create your first project to get started!</p>
      </div>
    );
  }

  return (
    <div style={containerStyles}>
      {projects.map((project) => (
        <Card
          key={project.id}
          hoverable
          onClick={() => navigate(`/projects/${project.id}`)}
        >
          <h3 style={projectTitleStyles}>{project.name}</h3>
          <p style={projectDescStyles}>
            {project.description || 'No description'}
          </p>
        </Card>
      ))}
    </div>
  );
};

export default ProjectList;
