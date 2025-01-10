'use client';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import BusinessIcon from '@mui/icons-material/Business';
import BadgeIcon from '@mui/icons-material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { json } from 'stream/consumers';


//Json
interface PaymentMethod {
  id: string;
  name: string; // efectivo, tarjeta, cheque
  credit: boolean;
}
//dafault payment method: efectivo

//json
interface Tax {
  id: string;
  name: string;
  percentage: number;
}
//dafault tax: IVA

interface PriceList {
  token: string;
  name: string;
  description: string;
}
//json
// UI debe pertmitir agregar y habilitar el uso de unidades en la creación del producto
// la unidad por defecto es unidad y el precio por defecto es 1
interface UnitOfMeasurement {
  token: string;
  name: string; //unidad, kilo, litro
}



// dafult Unit

// Configuración de productos


// calculo personalizado de precio de venta ser otra configuración 
// debe llevar si se usa unidad de medida o no
// si se  usa ocsto asocuado o no
// si se usa porcentje de utilidad o no

interface UnitOfMeasurement { // pero para el calculo de precio de venta // 
  token: string;
  name: string; //unidad, kilo, litro
  price: number; //precio por unidad de medida (ejemplo: 1 kilo de manzanas) 
}

interface CostAsociacdporunidad  {
  token: string;
  name: string; // manufactura, transporte, almacenaje, aduana, etc
}




interface commerceConfig {
  taxes: Tax[] ; //
  paymentMethods: PaymentMethod[];
  pricesLists: PriceList[];
  documents: []; //ticket //Boleta // factura ? lista ? 
  unitsOfMeasurement: UnitOfMeasurement[];
  liorenToken: string;
  name: string;
  rut: string;
  address: string;
  phone: string;
  email: string;
  userId: string;
  commerceId: string;
  defaultIvaffect: boolean;
  defaultDocument: string;
  defaultPaymentMethod: string;
  defaultPrinterPage: string;
  defaultPriceList: string;
  defaultTax: string;
  defaultUnitOfMeasurement: string;
}

export default function BasicCommerceForm() {
  const [commerceBasicData, setCommerceBasicData] = useState({
    name: '',
    rut: '',
    address: '',
    userId: '',
    commerceId: '',
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1} direction={'column'}>
          <Grid item>
            <TextField
              label="Nombre del comercio"
              variant="outlined"
              name="name"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Rut"
              variant="outlined"
              name="rut"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Dirección"
              variant="outlined"
              name="address"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Teléfono"
              variant="outlined"
              name="phone"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                height: 45,
              }}
            >
              Actualizar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
