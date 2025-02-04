'use client';
import { Box } from '@mui/material';
import React from 'react';
import CategoryForm from './ui/CategoryForm';

export default function page() {
  return (
    <Box p={1} boxShadow={2} borderRadius={1} m={1} bgcolor={'#ffffff'}>
      <CategoryForm />
    </Box>
  );
}
