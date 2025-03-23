'use client';
import {
  Box,
  Grid,
  IconButton,
  TextField,
  InputAdornment,
  Dialog,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '@/globalContext';
import ProductCard from './ui/ProductCard';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search'; // Importamos el ícono de búsqueda
import NewProductForm from './ui/NewProductForm';

export default function page() {
  const { commerce } = useGlobalContext();
  const [openNewProductDialog, setOpenNewProductDialog] = useState(false);
  const cont = 12;
  return (
    <>
      <Box
        sx={{
          padding: 1,
          borderRadius: 1,
          bgcolor: '#ffffff',
          border: '1px solid #ccc',
          boxShadow: 2,
          marginX: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            marginBottom: 1,
            marginTop: 1,
          }}
        >
          <TextField
            sx={{
              mr: 1,
            }}
            id="outlined-basic"
            label="Buscar producto"
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon /> {/* Agregamos el ícono de lupa */}
                </InputAdornment>
              ),
            }}
          />

          <IconButton
            onClick={() => setOpenNewProductDialog(true)}
            color="primary"
          >
            <AddIcon />
          </IconButton>
        </Box>
        <Grid container spacing={1}>
          {[...Array(cont)].map((_, index) => (
            <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
              <ProductCard />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog
        open={openNewProductDialog}
        onClose={() => setOpenNewProductDialog(false)}
        fullWidth
        maxWidth="md"
      >
        <Box p={1}>
          <NewProductForm />
        </Box>
      </Dialog>
    </>
  );
}
