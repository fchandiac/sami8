'use client';
import { Box, Grid, Typography, Button, TextField } from '@mui/material';
import React from 'react';

interface CategoryFormProps {
  afterSubmit?: () => void;
  id?: string;
  commerceId?: string;
  update?: boolean;
  name?: string;
  description?: string;
}
export default function CategoryForm({
  afterSubmit,
  id,
  commerceId,
  update = false,
  name,
  description,
}: CategoryFormProps) {

  const saveCategory = async () => {
    if (update) {
      console.log('update');
    } else {
      console.log('create');
    }
  };
  return (
    <>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveCategory();
          }}
        >
          <Grid container spacing={1} direction={'column'}>
            <Grid item>
              <Typography variant={'h6'}>
                {update ? 'Editar' : 'Nueva'} Categoría
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                label="Nombre"
                variant="outlined"
                size='small'
                fullWidth
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Descripción"
                name='descriptionFamily'
                variant="outlined"
                size='small'
                multiline
                rows={3}
                fullWidth
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            </Grid>
            <Grid item textAlign={'right'}>
              <Button onClick={afterSubmit} variant='contained' type='submit'>
                {update ? 'Actualizar' : 'Guardar'}
              </Button>
            </Grid>
          </Grid>
        </form>
    </>
  );
}
