import {
  Box,
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Switch,
  Button,
} from '@mui/material';
import React, { useState } from 'react';
import { createTax, updateTax } from '@/app/actions/taxes';

interface TaxFormProps {
  afterSubmit: () => void;
  id?: string;
  commerceId: string;
  update?: boolean;
  name?: string;
  sell?: boolean;
  purchase?: boolean;
  percentage?: number;
}

export default function TaxForm({
  afterSubmit,
  id,
  commerceId,
  update = false,
  name,
  sell,
  purchase,
  percentage,
}: TaxFormProps) {
  const [tax, setTax] = useState({
    id: update ? id : '',
    name: update ? name : '',
    sell: update ? sell : false,
    purchase: update ? purchase : false,
    percentage: update ? percentage : 0,
    commerceId: commerceId,
  });
  const [loading, setLoading] = useState(false);

  const saveTax = async () => {
    if (update) {
      setLoading(true);
      await updateTax({
        //@ts-ignore
        id: tax.id,
        //@ts-ignore
        name: tax.name,
        //@ts-ignore
        sell: tax.sell,
        //@ts-ignore
        purchase: tax.purchase,
        //@ts-ignore
        percentage: tax.percentage,
        commerceId: tax.commerceId,
      });
      setLoading(false);
    } else {
      setLoading(true);
      await createTax({
        //@ts-ignore
        name: tax.name,
        //@ts-ignore
        sell: tax.sell,
        //@ts-ignore
        purchase: tax.purchase,
        //@ts-ignore
        percentage: tax.percentage,
        commerceId: tax.commerceId,
      });

      setLoading(false);
    }
  };

  const isIva = () => {
    if (tax.name === 'IVA') {
      return true;
    } else {
      return false;
    }
  }

  return (

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await saveTax();
          afterSubmit();
        }}
      >
        <Grid container spacing={1} direction={'column'}>
          <Grid item>
            <Typography variant="h6" gutterBottom>
              {update ? 'Actualizar' : 'Nuevo'} impuesto
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Nombre"
              disabled={isIva()}
              value={tax.name}
              onChange={(e) => setTax({ ...tax, name: e.target.value })}
              size="small"
              fullWidth
              required
            />
          </Grid>
          <Grid item>
            <TextField
              label="Porcentaje"
              disabled={isIva()}
              type="number"
              inputProps={{ step: '0.01' }}
              value={tax.percentage}
              onChange={(e) =>
                setTax({ ...tax, percentage: parseFloat(e.target.value) })
              }
              size="small"
              fullWidth
              required
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={tax.sell}
                  onChange={(e) =>
                    setTax({
                      ...tax,
                      sell: e.target.checked,
                    })
                  }
                />
              }
              label="Habilitado para ventas"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={tax.purchase}
                  onChange={(e) =>
                    setTax({
                      ...tax,
                      purchase: e.target.checked,
                    })
                  }
                />
              }
              label="Habilitado para compras"
            />
          </Grid>
          <Grid item textAlign={'right'}>
            <Button disabled={loading} variant="contained" type="submit">
              {update ? 'Actualizar' : 'Guardar'}
            </Button>
          </Grid>
        </Grid>
      </form>
  );
}
