import React from 'react'
import { Box, Typography, Button } from '@mui/material'

interface CommerceCardProps {
    name?: string;
    rut?: string;
}

export default function CommerceCard({ name = 'Comercio Desconocido', rut = 'RUT no disponible' }: CommerceCardProps) {
  return (
   <>
   <Box
        sx={{
          borderRadius: '1rem',
          border: '1px solid',
          boxShadow: '0 4px 4px rgba(0, 0, 0, 0.4)',
          color: 'black',
          p: 1,
        }}
      >
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        {name}
      </Typography>
      
      <Typography variant="body1" sx={{ color: 'gray' }}>
        {rut}
      </Typography>

      <Box sx={{ flexGrow: 1 }} />


   </Box>
   </>
  )
}
