import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import BasicCommerceForm from './ui/BasicCommerceForm';
import PaymentsMethods from './ui/PaymentsMethods';
import Taxes from './ui/Taxes';
import NewProduct from './ui/NewProduct';
import PricesLists from './ui/PricesLists';

export default function ConfigPage() {
  return (
    <>
      <Container
        sx={{
          paddingX: {
            xs: 0,
            sm: 5,
            md: 10,
            lg: 20,
          },
          marginTop: 10,
        }}
      >
        <Grid spacing={1} direction={'column'}>
          <Grid item>
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
              <Taxes />
            </Box>
          </Grid>
          <Grid item>
            <Box p={1} boxShadow={2} borderRadius={1} m={1} bgcolor={'#ffffff'}>
              <PricesLists />
            </Box>
          </Grid>
          <Grid item>
            <Box p={1} boxShadow={2} borderRadius={1} m={1} bgcolor={'#ffffff'}>
              {/* <PricesLists /> */}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
