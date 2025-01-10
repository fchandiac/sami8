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

interface Tax {
  id: string;
  name: string;
  percentage: number;
  canBeDeleted: boolean;
  sell: boolean; // Permite realizar pagos al vender
  purchase: boolean;
}

const initialTaxes: Tax[] = [
  {
    id: '1',
    name: 'IVA',
    percentage: 19,
    canBeDeleted: false,
    sell: true,
    purchase: true,
  },
  {
    id: '2',
    name: 'Impuesto sobre la renta',
    percentage: 25,
    canBeDeleted: true,
    sell: true,
    purchase: true,
  },
  {
    id: '3',
    name: 'Impuesto de propiedad',
    percentage: 10,
    canBeDeleted: true,
    sell: false,
    purchase: false,
  },
];

export default function Taxes() {
  const [taxes, setTaxes] = useState(initialTaxes);

  const handleDelete = (id: string) => {
    setTaxes((prev) => prev.filter((tax) => tax.id !== id));
    console.log(`Deleted tax with id: ${id}`);
  };

  const handleEdit = (id: string) => {
    console.log(`Editing tax with id: ${id}`);
    // Implementar lógica de edición aquí
  };

  return (
    <>
      <Box justifyContent={'space-between'} display={'flex'}>
        <Typography variant="h6" gutterBottom flexGrow={1}>
          Impuestos
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
              <TableCell>Porcentaje</TableCell>
              <TableCell>Ventas</TableCell> {/* Columna Ventas */}
              <TableCell>Compras</TableCell> {/* Columna Compras */}
              <TableCell></TableCell> {/* Columna de acciones */}
            </TableRow>
          </TableHead>
          <TableBody>
            {taxes.map((tax) => (
              <TableRow key={tax.id}>
                <TableCell>{tax.name}</TableCell>
                <TableCell>{(tax.percentage /100).toLocaleString('es-CL', {
                  style: 'percent',
                  minimumFractionDigits: 2,
                })}</TableCell>
                <TableCell>
                  {tax.sell ? (
                    <CheckIcon color="success" />
                  ) : (
                    <CloseIcon color="error" />
                  )}
                </TableCell>
                <TableCell>
                  {tax.purchase ? (
                    <CheckIcon color="success" />
                  ) : (
                    <CloseIcon color="error" />
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(tax.id)}
                    color="primary"
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(tax.id)}
                    disabled={!tax.canBeDeleted}
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
