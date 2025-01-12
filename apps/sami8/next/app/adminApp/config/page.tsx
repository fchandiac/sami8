import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import BasicCommerceForm from './ui/BasicCommerceForm';
import PaymentsMethods from './ui/PaymentsMethods';
import Taxes from './ui/Taxes';
import NewProduct from './ui/NewProduct';
import PricesLists from './ui/PricesLists';


export default function ConfigPage() {



  return (
    <>
      <Grid container spacing={1} direction={'row'} p={1}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box p={1} boxShadow={2} borderRadius={1} m={1} bgcolor={'#ffffff'}>
            <Typography variant="h6" gutterBottom>
              Información básica
            </Typography>
            <BasicCommerceForm />
          </Box>
        </Grid>
        <Grid item>
          <Box p={1} boxShadow={2} borderRadius={1} m={1} bgcolor={'#ffffff'}>
          
            <PaymentsMethods />
          </Box>
        </Grid>
        <Grid item>
          <Box p={1} boxShadow={2} borderRadius={1} m={1} bgcolor={'#ffffff'}>
            {/* <Taxes /> */}
          </Box>
        </Grid>
        <Grid item>
          <Box p={1} boxShadow={2} borderRadius={1} m={1} bgcolor={'#ffffff'}>
            {/* <NewProduct /> */}
          </Box>
        </Grid>
        <Grid item>
          <Box p={1} boxShadow={2} borderRadius={1} m={1} bgcolor={'#ffffff'}>
            {/* <PricesLists /> */}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
