import React from 'react';
import { Commerce } from '../../actions/commerces';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface SelectCommerceProps {
  userId?: string;
  commerces: Commerce[];
}

export default function SelectCommerce({
  userId = 'defaultUserId',
  commerces = [],
}: SelectCommerceProps) {
  return (
    <FormControl 
    
    size='small'
    
    fullWidth>
      <InputLabel id="select-commerce-label">Select Commerce</InputLabel>
      <Select labelId="select-commerce-label" label="Select Commerce">
        {commerces.map((commerce) => (
          <MenuItem key={commerce.id} value={commerce.id}>
            {commerce.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
