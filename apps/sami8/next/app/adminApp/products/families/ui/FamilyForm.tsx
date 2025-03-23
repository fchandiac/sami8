import { Box, Grid, Typography, Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '@/globalContext';
import { createFamily } from '@/app/actions/families';
import { updateFamily } from '@/app/actions/families';

interface FamilyFormProps {
  afterSubmit?: () => void;
  id?: string;
  commerceId?: string;
  update?: boolean;
  name?: string;
  description?: string;
  gridApiRef?: any;
}
export default function FamilyForm({
  afterSubmit = () => {},
  id,
  commerceId,
  update = false,
  name,
  description,
  gridApiRef,
}: FamilyFormProps) {
  const { commerce, showAlert } = useGlobalContext();
  const [formData, setFormData] = useState({
    id: id || '',
    name: name || '',
    description: description || '',
    commerceId: commerceId || commerce.userCommerce.id,
  });

  const saveFamily = async () => {
    if (update) {

      const saving = await updateFamily({
        id: formData.id,
        name: formData.name,
        description: formData.description,
      });

      gridApiRef.current.updateRows([
        {
          id: formData.id,
          name: formData.name,
          description: formData.description,
        },
      ]);

      afterSubmit();
      showAlert('Familia actualizada', 'success');

    } else {
      const saving = await createFamily({
        name: formData.name,
        description: formData.description,
        commerceId: formData.commerceId || '',
      });
      afterSubmit();
      showAlert('Familia creada', 'success');
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveFamily();
        }}
      >
        <Grid container spacing={1} direction={'column'}>
          
          <Grid item>
            <Typography variant={'h6'}>
              {update ? 'Actuaizar' : 'Nueva'} Familia
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Nombre"
              variant="outlined"
              value={formData.name}
              size="small"
              fullWidth
              required
              onChange={(e) => {
                setFormData({
                  ...formData,
                  name: e.target.value,
                });
              }}
            />
          </Grid>

          <Grid item>
            <TextField
              label="Descripción"
              name="descriptionFamily"
              variant="outlined"
              size="small"
              multiline
              value={formData.description}
              rows={3}
              fullWidth
              onChange={(e) => {
                setFormData({
                  ...formData,
                  description: e.target.value,
                });
              }}
            />
          </Grid>

          <Grid item textAlign={'right'}>
            <Button variant="contained" type="submit">
              {update ? 'Actualizar' : 'Guardar'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
