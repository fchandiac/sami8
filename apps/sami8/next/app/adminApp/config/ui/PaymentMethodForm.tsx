'use client';
import React, { useState } from 'react';
import {
  Alert,
  Box,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Switch,
  Button,
} from '@mui/material';
import {
  createPaymentMethod,
  updatePaymentMethod,
} from '@/app/actions/paymentsMethods';
import { useGlobalContext } from '@/globalContext';

interface PaymentMethodFormProps {
  afterSubmit: () => void;
  id?: string;
  commerceId: string;
  update?: boolean;
  name?: string;
  credit?: boolean;
  sell?: boolean;
  purchase?: boolean;
  allowsInstallments?: boolean;
  maxInstallments?: number;
  comission?: number;
}

export default function PaymentMethodForm({
  afterSubmit,
  id,
  commerceId,
  update = false,
  name,
  credit,
  sell,
  purchase,
  allowsInstallments,
  maxInstallments,
  comission,
}: PaymentMethodFormProps) {
  const [loading, setLoading] = useState(false);
  const { showAlert } = useGlobalContext();
  const [paymentMethod, setPaymentMethod] = useState({
    id: update ? id : '',
    name: update ? name : '',
    credit: update ? credit : false,
    sell: update ? sell : false,
    purchase: update ? purchase : false,
    allowsInstallments: update ? allowsInstallments : false,
    maxInstallments: update ? maxInstallments : 0,
    commerceId: commerceId,
    comission: update ? comission : 0,
  });

  const canBeDeleted = true;

  const isChash = () => {
    if (paymentMethod.name === 'Efectivo') {
      return true;
    } else {
      return false;
    }
  };

  const save = async () => {
    if (update) {
      // console.log('Updating payment method', paymentMethod);
      try {
        setLoading(true);
        await updatePaymentMethod({
          id: paymentMethod.id || '',
          name: paymentMethod.name || '',
          //@ts-ignore
          credit: paymentMethod.credit,
          //@ts-ignore
          sell: paymentMethod.sell,
          //@ts-ignore
          purchase: paymentMethod.purchase,
          allowsInstallments: paymentMethod.allowsInstallments,
          maxInstallments: paymentMethod.maxInstallments,
          commerceId: commerceId,
          comission: paymentMethod.comission,
          canBeDeleted,
        });
        setLoading(false);
        afterSubmit();
        showAlert('Método de pago actualizado con éxito', 'success');
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        setLoading(true);
        await createPaymentMethod({
          name: paymentMethod.name || '',
          credit: paymentMethod.credit ?? false,
          sell: paymentMethod.sell ?? false,
          purchase: paymentMethod.purchase ?? false,
          allowsInstallments: paymentMethod.allowsInstallments,
          maxInstallments: paymentMethod.maxInstallments,
          commerceId: commerceId,
          comission: paymentMethod.comission,
          canBeDeleted,
        });
        setLoading(false);
        afterSubmit();
        showAlert('Método de pago creado con éxito', 'success');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Box p={2}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          save();
        }}
      >
        <Grid container spacing={1} direction={'column'}>
          <Grid item>
            <Typography variant="h6" gutterBottom>
              {update ? 'Actualizar' : 'Nuevo'} método de pago
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Nombre"
              name='PaymentMethodName'
              disabled={isChash()}
              value={paymentMethod.name}
              onChange={(e) =>
                setPaymentMethod({ ...paymentMethod, name: e.target.value })
              }
              required
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              disabled={isChash()}
              control={
                <Switch
                  checked={paymentMethod.credit}
                  onChange={(e) =>
                    setPaymentMethod({
                      ...paymentMethod,
                      credit: e.target.checked,
                    })
                  }
                />
              }
              label="Crédito"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              disabled={isChash()}
              control={
                <Switch
                  checked={paymentMethod.allowsInstallments}
                  onChange={(e) =>
                    setPaymentMethod({
                      ...paymentMethod,
                      allowsInstallments: e.target.checked,
                    })
                  }
                />
              }
              label="Permite cuotas"
            />
          </Grid>
          {paymentMethod.allowsInstallments && (
            <Grid item>
              <TextField
                label="Máximo de cuotas"
                value={paymentMethod.maxInstallments}
                type="number"
                onChange={(e) =>
                  setPaymentMethod({
                    ...paymentMethod,
                    maxInstallments: parseInt(e.target.value),
                  })
                }
                required={paymentMethod.allowsInstallments}
                fullWidth
                size="small"
              />
            </Grid>
          )}
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={paymentMethod.sell}
                  onChange={(e) =>
                    setPaymentMethod({
                      ...paymentMethod,
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
                  checked={paymentMethod.purchase}
                  onChange={(e) =>
                    setPaymentMethod({
                      ...paymentMethod,
                      purchase: e.target.checked,
                    })
                  }
                />
              }
              label="Habilitado para compras"
            />
          </Grid>

          <Grid item>
            <TextField
              disabled={isChash()}
              label="Comisión"
              value={paymentMethod.comission}
              type="number"
              onChange={(e) =>
                setPaymentMethod({
                  ...paymentMethod,
                  comission: parseFloat(e.target.value), // No hace falta convertir aquí, se puede manejar después si es necesario
                })
              }
              inputProps={{ step: '0.01' }} // Permite decimales con precisión de 2 dígitos
              required
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item textAlign={'right'}>
            <Button variant="contained" disabled={loading} type="submit">
              {update ? 'Actualizar' : 'Guardar'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
