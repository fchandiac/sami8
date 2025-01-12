'use client';
import React, { useState, useEffect } from 'react';
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
import { useGlobalContext } from '@/globalContext';
import { updateBasicInformation } from '@/app/actions/commerces';
import { useRouter } from 'next/navigation';


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
  const { commerce, showAlert } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const  [basicInfo, setBasicInfo] = useState({
    id: '',
    name: '',
    rut: '',
    address: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    setBasicInfo({
      id: commerce.userCommerce.id || '',
      name: commerce.userCommerce.name || '',
      rut: commerce.userCommerce.rut || '',
      address: commerce.userCommerce.address || '',
      phone: commerce.userCommerce.phone || '',
      email: commerce.userCommerce.email || '',
     
    });
  }, [commerce]);


 

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const { id, address, phone, email } = basicInfo;
    const updateCommerce = await updateBasicInformation({ id, address, phone, email });
    commerce.updateBasicInformation(address, phone, email);
    showAlert('Información básica de comercio actualizada', 'success');
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Grid container spacing={1} direction={'column'}>
          <Grid item>
            <TextField
              label="Nombre del comercio"
              variant="outlined"
              value={basicInfo.name}
              disabled
              name="name"
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
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
              disabled
              value={basicInfo.rut}
              name="rut"
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
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
              value={basicInfo.address || ''}
              onChange={(e) => setBasicInfo({ ...basicInfo, address: e.target.value })}
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
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
              value={basicInfo.phone}
              onChange={(e) => setBasicInfo({ ...basicInfo, phone: e.target.value })}
              name="phone"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                   {'+56'}
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
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
              value={basicInfo.email}
              onChange={(e) => setBasicInfo({ ...basicInfo, email: e.target.value })}
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item>
            <Button
              disabled={loading}
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
