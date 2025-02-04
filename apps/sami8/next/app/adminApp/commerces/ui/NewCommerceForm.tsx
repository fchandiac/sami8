import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

interface NewCommerceFormProps {
  name?: string;
  rut?: string;
  address?: string;
  liorenToken?: string;
  userId?: string;
}

export default function NewCommerceForm({
  name = 'commerceName',
  rut = '11.111.111-1',
  address = 'commerceAddress',
  liorenToken = 'commerceToken',
  userId = 'userId',
}: NewCommerceFormProps) {
  const [formValues, setFormValues] = useState({
    name,
    rut,
    address,
    liorenToken,
    userId,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Formulario enviado:', formValues);
    // Aquí puedes agregar lógica para enviar los datos a una API o manejar la información
  };

  return (
    <Box sx={{ p: 3, maxWidth: 400, margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Nuevo Comercio
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nombre del Comercio"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="RUT"
          name="rut"
          value={formValues.rut}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Dirección"
          name="address"
          value={formValues.address}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Token de Lioren"
          name="liorenToken"
          value={formValues.liorenToken}
          onChange={handleChange}
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Enviar
        </Button>
      </form>
    </Box>
  );
}
