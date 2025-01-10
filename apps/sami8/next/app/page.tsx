'use client';

import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f9f9f9' }}>
      <Container maxWidth="md">
        <Box textAlign="center" mb={4}>
          <StorefrontIcon sx={{ fontSize: 80, color: 'primary.main' }} />
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            Bienvenido a FlowStore
          </Typography>
          <Typography variant="h6" color="text.secondary">
           Gestiona tu negocio de manera eficiente y aumenta tus ventas.
          </Typography>
        </Box>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{
       
                bgcolor: 'primary.main',
                ':hover': { bgcolor: 'primary.dark' },
              }}

              onClick={() => {
                router.push('/sign-in');
              }}
     
              
            >
              Ingresar
            </Button>
          </Grid>
       
        </Grid>
      </Container>
    </Box>
  );
}
