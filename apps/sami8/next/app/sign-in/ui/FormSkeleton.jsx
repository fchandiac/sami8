// FormSkeleton.jsx
import { Box } from '@mui/material';
import React from 'react';

export default function FormSkeleton() {
  return (
    <div className="skeleton-form">
      <Box
        className="skeleton-item skeleton-text"
        sx={{
          width: '100%',
          height: '6vh',
          borderRadius: 2,
          mb: 2,
          mt: '30vh',
        }}
      ></Box>
      <Box
        className="skeleton-item skeleton-text"
        sx={{
          width: '100%',
          height: '6vh',
          borderRadius: 2,
          mb: 2,
        }}
      ></Box>

      <Box
        className="skeleton-item skeleton-text skeleton-short"
        sx={{
          height: '3vh',
          borderRadius: 2,
          mb: 2,
        }}
      ></Box>

      <Box
        className="skeleton-item skeleton-text"
        sx={{
          width: '100%',
          height: '6vh',
          borderRadius: 20,
          mb: 2,
        }}
      ></Box>
      <Box
        className="skeleton-item skeleton-text"
        sx={{
          width: '100%',
          height: '6vh',
          borderRadius: 2,
          mb: 2,
        }}
      ></Box>
    </div>
  );
}
