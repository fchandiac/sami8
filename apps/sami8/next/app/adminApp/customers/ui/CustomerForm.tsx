'use client';
import {
  Grid,
  Typography,
  Button,
  TextField,
  Autocomplete,
  InputAdornment,
} from '@mui/material';
import React, { useState } from 'react';
import { useGlobalContext } from '@/globalContext';
import states from '../../../../states';
import { createCustomer } from '@/app/actions/customers';

interface CustomerFormProps {
  afterSubmit?: () => void;
  id?: string;
  commerceId?: string;
  update?: boolean;
  name?: string;
  rut?: string;
  socialReason?: string;
  email?: string;
  phone?: string;
  gridApiRef?: any;
}

export default function CustomerForm({
  afterSubmit = () => {},
  id,
  commerceId,
  update = false,
  name,
  email,
  phone,
  rut,
  socialReason,
  gridApiRef,
}: CustomerFormProps) {
  const { commerce, showAlert } = useGlobalContext();
  const [formData, setFormData] = useState({
    id: id || '',
    name: name || '',
    email: email || '',
    phone: phone || '',
    commerceId: commerceId || commerce.userCommerce.id,
    rut: rut || '',
    socialReason: socialReason || '',
    state: '',
    city: '',
  });

  const handleStateChange = (event: any, value: string | null) => {
    setFormData({ ...formData, state: value || '', city: '' });
  };

  const handleCityChange = (event: any, value: string | null) => {
    console.log(value);
    setFormData({ ...formData, city: value || '' });
  };

  const saveCustomer = async () => {
    if (update) {
      afterSubmit();
      showAlert('Cliente actualizado', 'success');
    } else {

      const newCustomer = await createCustomer({
        commerceId: commerce.userCommerce.id || '',
        name: formData.name,
        email: formData.email? 'mail@mail.com' : formData.email,
        phone: formData.phone? '99999999' : formData.phone,
        rut: formData.rut,
        socialReason: formData.socialReason,
        state: formData.state,
        city: formData.city,  
      });
      afterSubmit();

      console.log(newCustomer);
      showAlert('Cliente creado', 'success');
    }
  };

  function formatRut(rut: any) {
    // Eliminar puntos y guiones
    let valor = rut.replace(/[.-]/g, '');

    // Si el valor no tiene la longitud correcta, no lo formateamos
    if (valor.length < 7 || valor.length > 9) {
      return rut; // Retornar el RUT tal cual si no tiene longitud válida
    }

    // Formateo del RUT
    if (valor.length <= 8) {
      valor = valor.replace(/(\d{1})(\d{3})(\d{3})$/, '$1.$2.$3');
    } else if (valor.length === 9) {
      valor = valor.replace(/(\d{2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
    }

    return valor;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        saveCustomer();
      }}
    >
      <Grid container spacing={1} direction="column">
        <Grid item>
          <Typography variant="h6">
            {update ? 'Actualizar' : 'Nuevo'} Cliente
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Nombre"
            variant="outlined"
            size="small"
            fullWidth
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            label="Rut"
            variant="outlined"
            size="small"
            fullWidth
            value={formData.rut}
            onChange={(e) => {
              const rut = e.target.value;
              // Formatear el RUT a medida que el usuario escribe
              const formattedRut = formatRut(rut);
              setFormData({ ...formData, rut: formattedRut });
            }}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            label="Razón Social"
            variant="outlined"
            size="small"
            fullWidth
            value={formData.socialReason}
            onChange={(e) => {
              setFormData({ ...formData, socialReason: e.target.value });
            }}

          />
        </Grid>
        <Grid item>
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            fullWidth
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            label="Teléfono"
            variant="outlined"
            size="small"
            fullWidth
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+56</InputAdornment>
              ),
            }}
            required
          />
        </Grid>
        <Grid item>
          <Autocomplete
            options={states.map((state) => state.name)}
            value={formData.state}
            onChange={handleStateChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Región"
                variant="outlined"
                size="small"
                fullWidth
                required
              />
            )}
          
          />
        </Grid>
        <Grid item>
          <Autocomplete
            options={
              states.find((state) => state.name === formData.state)?.cities ||
              []
            }
            // value={formData.city}
            // onChange={handleCityChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Ciudad"
                variant="outlined"
                size="small"
                fullWidth
                required
              />
            )}
            disabled={!formData.state}
          />
        </Grid>
        <Grid item textAlign="right">
          <Button variant="contained" type="submit">
            {update ? 'Actualizar' : 'Guardar'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
