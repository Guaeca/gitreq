/**
 * File List Component
 * Displays all files for a project
 */

import React, { useState, useEffect } from 'react';
import fileService from '../../services/fileService.js';
import { Card } from '../../design-system/components/index.js';
import { spacing, colors } from '../../design-system/tokens/index.js';

const FileList = ({ projectId, onFileSelect }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (projectId) {
      loadFiles();
    }
  }, [projectId]);

  const loadFiles = async () => {
    try {
      const response = await fileService.getProjectFiles(projectId);
      setFiles(response.data);
    } catch (err) {
      setError('Failed to load files');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[3],
  };

  const fileCardStyles = {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const fileNameStyles = {
    fontWeight: 500,
    color: colors.neutral[900],
  };

  const fileTypeStyles = {
    fontSize: '0.75rem',
    color: colors.neutral[600],
    textTransform: 'uppercase',
    backgroundColor: colors.neutral[100],
    padding: `${spacing[1]} ${spacing[2]}`,
    borderRadius: '4px',
  };

  const emptyStateStyles = {
    textAlign: 'center',
    padding: spacing[6],
    color: colors.neutral[600],
  };

  if (loading) {
    return <div>Loading files...</div>;
  }

  if (error) {
    return <div style={{ color: colors.error.main }}>{error}</div>;
  }

  if (files.length === 0) {
    return (
      <div style={emptyStateStyles}>
        <p>No files yet. Create your first requirement file!</p>
      </div>
    );
  }

  return (
    <div style={containerStyles}>
      {files.map((file) => (
        <Card
          key={file.id}
          padding="small"
          hoverable
          onClick={() => onFileSelect && onFileSelect(file)}
        >
          <div style={fileCardStyles}>
            <span style={fileNameStyles}>{file.name}</span>
            <span style={fileTypeStyles}>{file.type}</span>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default FileList;
