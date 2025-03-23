'use client';
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  Autocomplete,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '@/globalContext';
import { createCategory } from '@/app/actions/categories';
import { updateCategory } from '@/app/actions/categories';
import { findFamilyById } from '@/app/actions/families';
import { findAllFamiliesByCommerceId } from '@/app/actions/families';


interface CategoryFormProps {
  afterSubmit?: () => void;
  id?: string;
  commerceId?: string;
  update?: boolean;
  name?: string;
  description?: string;
  familyId?: string;
  gridApiRef?: any;
}

export default function CategoryForm({
  afterSubmit = () => {},
  id,
  commerceId,
  update = false,
  name,
  description,
  familyId,
  gridApiRef,
}: CategoryFormProps) {
  const { commerce, showAlert } = useGlobalContext();
  const [formData, setFormData] = useState({
    id: id || '',
    name: name || '',
    description: description || '',
    commerceId: commerceId || commerce.userCommerce.id,
    familiId: '',
  });
  const [familiesList, setFamiliesList] = useState<
    { id: string; name: string }[]
  >([]);

  const findFamilies = async () => {
    const families = await findAllFamiliesByCommerceId(
      commerce.userCommerce.id || '',
    );
    setFamiliesList(families);
  };

  useEffect(() => {
    findFamilies();
  }, [commerce.userCommerce.id]);


  useEffect(() => {
    if (familyId) {
      setFormData((prev) => ({ ...prev, familiId: familyId }));
    }
  }, [familyId]);

  const saveCategory = async () => {
    if (update) {
      await updateCategory({
        id: formData.id,
        name: formData.name,
        description: formData.description,
        familyId: formData.familiId || '',
      });

      const family = await findFamilyById(formData.familiId);

      gridApiRef.current.updateRows([
        {
          id: formData.id,
          name: formData.name,
          description: formData.description,
          familyName: family.name,
        },
      ]);
        
      //console.log('apiRef', gridApiRef);
      
      afterSubmit();
      showAlert('Categoría actualizada', 'success');
      
    } else {
      await createCategory({
        name: formData.name,
        description: formData.description,
        commerceId: formData.commerceId || '',
        familyId: formData.familiId || '',
      });
      afterSubmit();
      showAlert('Categoría creada', 'success');
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
        <Grid container spacing={1} direction="column">
          <Grid item>
            <Typography variant="h6">
              {update ? 'Editar' : 'Nueva'} Categoría
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
              label="Descripción"
              variant="outlined"
              size="small"
              multiline
              rows={3}
              fullWidth
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
              }}
            />
          </Grid>
          {/* 🔽 Autocomplete para Families 🔽 */}
          <Grid item>
            <Autocomplete
              options={familiesList}

              getOptionLabel={(option) => option.name}
              value={familiesList.find((f) => f.id === formData.familiId) || null}
              onChange={(event, newValue) => {
                setFormData({ ...formData, familiId: newValue?.id || '' });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Familia" variant="outlined" size="small" fullWidth required />
              )}
            />
          </Grid>
          <Grid item textAlign="right">
            <Button variant="contained" type="submit">
              {update ? 'Actualizar' : 'Guardar'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
