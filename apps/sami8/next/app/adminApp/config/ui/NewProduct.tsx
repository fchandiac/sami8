import React from 'react';
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  IconButton,
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

export default function NewProduct() {
  return (
    <>
      <Box justifyContent={'space-between'} minWidth={300}>
        <Typography variant="h6" gutterBottom flexGrow={1}>
          Nuevo Producto
        </Typography>
        <Box display={'flex'} justifyContent={'space-between'}>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Producto Afecto/Excento"
          />
          <IconButton>
            <HelpIcon />
          </IconButton>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Categoría"
          />
          <IconButton>
            <HelpIcon />
          </IconButton>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Calculo precio de venta"
          />
          <IconButton>
            <HelpIcon />
          </IconButton>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="IVA automático"
          />
          <IconButton>
            <HelpIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}
