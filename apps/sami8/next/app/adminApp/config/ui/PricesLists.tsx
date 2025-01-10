'use client';
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface PriceList {
  id: string;
  name: string;
  description: string;
  canBeDeleted?: boolean;
}

const initialPriceLists: PriceList[] = [
  {
    id: '1',
    name: 'Lista de precios 1',
    description: 'Lista de precios para productos de primera necesidad',
    canBeDeleted: false,
  },
  {
    id: '2',
    name: 'Lista de precios 2',
    description: 'Lista de precios para productos de lujo',
    canBeDeleted: true,
  },
  {
    id: '3',
    name: 'Lista de precios 3',
    description: 'Lista de precios para productos de segunda mano',
  },
];

export default function PricesLists() {
  const [priceLists, setPriceLists] = useState(initialPriceLists);

  const handleDelete = (id: string) => {
    console.log(`Deleted price list with id: ${id}`);

  };

  const handleEdit = (id: string) => {
    console.log(`Editing tax with id: ${id}`);
    // Implementar lógica de edición aquí
  };

  return (
    <>
      <Box justifyContent={'space-between'} display={'flex'}>
        <Typography variant="h6" gutterBottom flexGrow={1}>
          Listas de precios
        </Typography>
        <IconButton
          color="primary"
          aria-label="add"
          onClick={() => console.log('Add new payment method')}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <TableContainer
        sx={{ marginTop: 2, border: '1px solid #ccc', borderRadius: 1 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell></TableCell> {/* Columna de acciones */}
            </TableRow>
          </TableHead>
          <TableBody>
            {priceLists.map((list) => (
              <TableRow key={list.id}>
                <TableCell>{list.name}</TableCell>
          
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(list.id)}
                    color="primary"
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(list.id)}
                    disabled={!list.canBeDeleted}
                    color="error"
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
