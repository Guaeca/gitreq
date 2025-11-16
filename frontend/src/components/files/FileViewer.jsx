/**
 * File Viewer Component
 * Displays file content with syntax highlighting based on type
 */

import React, { useState, useEffect } from 'react';
import fileService from '../../services/fileService.js';
import { Card } from '../../design-system/components/index.js';
import { spacing, colors } from '../../design-system/tokens/index.js';

const FileViewer = ({ fileId }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (fileId) {
      loadFile();
    }
  }, [fileId]);

  const loadFile = async () => {
    try {
      const response = await fileService.getFile(fileId);
      setFile(response.data);
    } catch (err) {
      setError('Failed to load file');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const headerStyles = {
    borderBottom: `2px solid ${colors.neutral[200]}`,
    paddingBottom: spacing[3],
    marginBottom: spacing[4],
  };

  const titleStyles = {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: colors.neutral[900],
    marginBottom: spacing[2],
  };

  const typeStyles = {
    fontSize: '0.875rem',
    color: colors.neutral[600],
    textTransform: 'uppercase',
  };

  const contentStyles = {
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
    backgroundColor: colors.neutral[50],
    padding: spacing[4],
    borderRadius: '4px',
    fontSize: '0.875rem',
    lineHeight: 1.6,
    color: colors.neutral[800],
    overflowX: 'auto',
  };

  if (loading) {
    return <div>Loading file...</div>;
  }

  if (error) {
    return <div style={{ color: colors.error.main }}>{error}</div>;
  }

  if (!file) {
    return <div>No file selected</div>;
  }

  return (
    <Card>
      <div style={headerStyles}>
        <h2 style={titleStyles}>{file.name}</h2>
        <span style={typeStyles}>Type: {file.type}</span>
      </div>
      <div style={contentStyles}>{file.content}</div>
    </Card>
  );
};

export default FileViewer;
