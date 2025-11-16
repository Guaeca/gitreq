/**
 * Project Page
 * View and manage a single project and its files
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/layout/Header.jsx';
import FileList from '../components/files/FileList.jsx';
import FileViewer from '../components/files/FileViewer.jsx';
import { Button } from '../design-system/components/index.js';
import { spacing, colors } from '../design-system/tokens/index.js';
import projectService from '../services/projectService.js';

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProject();
  }, [id]);

  const loadProject = async () => {
    try {
      const response = await projectService.getProject(id);
      setProject(response.data);
    } catch (err) {
      console.error('Failed to load project:', err);
    } finally {
      setLoading(false);
    }
  };

  const containerStyles = {
    minHeight: '100vh',
    backgroundColor: colors.neutral[50],
  };

  const contentStyles = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: spacing[6],
  };

  const headerSectionStyles = {
    marginBottom: spacing[6],
  };

  const titleStyles = {
    fontSize: '2rem',
    fontWeight: 700,
    color: colors.neutral[900],
    marginBottom: spacing[2],
  };

  const descriptionStyles = {
    color: colors.neutral[600],
    fontSize: '1rem',
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gap: spacing[6],
    marginTop: spacing[6],
  };

  const sidebarStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4],
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div style={containerStyles}>
      <Header />
      <div style={contentStyles}>
        <div style={headerSectionStyles}>
          <h1 style={titleStyles}>{project.name}</h1>
          <p style={descriptionStyles}>{project.description || 'No description'}</p>
        </div>

        <div style={gridStyles}>
          <div style={sidebarStyles}>
            <Button fullWidth>New File</Button>
            <FileList
              projectId={id}
              onFileSelect={(file) => setSelectedFileId(file.id)}
            />
          </div>

          <div>
            {selectedFileId ? (
              <FileViewer fileId={selectedFileId} />
            ) : (
              <div style={{ textAlign: 'center', color: colors.neutral[600] }}>
                Select a file to view its contents
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
