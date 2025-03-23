import { Box, Typography } from '@mui/material';
import React from 'react';

// Nota un punto de venta tiene Cajas
// Si el punto de venta esta abierto no puede ser utilizado por otro usuario

interface CashRegisterMovement {
  id: string;
  amount: number;
  type: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface CashRegister {
  id: string;
  status: string;
  user: string;
  salePoint: string;
}

interface SalePoint {
  name: string;
  address: string;
  phone: string;
  status: string;
  id: string;
  cashRegister: CashRegister;
}

export default function SalePointCard() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 1,
          borderRadius: 1,
          bgcolor: '#ffffff',
          border: '1px solid #ccc',
          maxWidth: '300px',
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Typography fontSize={12} color="#757575">
            id: {'khj7876kja8jk.ioauil'}
          </Typography>

          <Typography variant="h6" color="#212121">
            SalePoint Name
          </Typography>
          <Typography fontSize={12} color="#424242">
            <strong>Dirección: </strong>
            {'Los Olivos 333'}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Box
            sx={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: '2px solid black',
              backgroundColor: 'green',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
          />
        </Box>
      </Box>
    </>
  );
}
