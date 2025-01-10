'use client';
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import HelpIcon from '@mui/icons-material/Help';

interface PaymentMethod {
  id: string;
  name: string; // efectivo, tarjeta, cheque
  credit: boolean; // si no otorga credito automaticamente es sin cuotas
  sell?: boolean; // si está disponible para la venta
  purchase?: boolean; // Indica si permite compras
  canBeDeleted?: boolean;
  allowsInstallments?: boolean; // Indica si permite cuotas
  maxInstallments?: number; // Cantidad máxima de cuotas
  commerceId?: string;
  comission?: number;
}

const initialPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    name: 'Efectivo',
    credit: false,
    canBeDeleted: false,
    sell: true, // Permite realizar pagos al vender
    allowsInstallments: false,
    purchase: true,
    comission: 0,
  },
  {
    id: '2',
    name: 'Tarjeta',
    credit: true,
    canBeDeleted: true,
    sell: true, // Permite realizar pagos al vender
    allowsInstallments: true,
    maxInstallments: 12,
    purchase: true,
    comission: 0.03,
  },
  {
    id: '3',
    name: 'Cheque',
    credit: true,
    canBeDeleted: true,
    sell: false, // No está disponible para la venta
    allowsInstallments: true,
    maxInstallments: 6,
    purchase: false,
    comission: 0.05,
  },
];

export default function PaymentsMethods() {
  const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = (id: string) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id));
    console.log(`Deleted payment method with id: ${id}`);
  };

  const handleEdit = (id: string) => {
    console.log(`Editing payment method with id: ${id}`);
    // Implementar lógica de edición aquí
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Box justifyContent={'space-between'} display={'flex'}>
        <Typography variant="h6" gutterBottom flexGrow={1}>
          Medios de pago
        </Typography>
        <IconButton
          // sx={{
          //   border: '1px solid #ccc',
          // }}
          color="primary"
          aria-label="add"
          onClick={() => console.log('Add new payment method')}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          // sx={{
          //   border: '1px solid #ccc',
          // }}
          color="primary"
          aria-label="help"
          onClick={handleDialogOpen}
        >
          <HelpIcon />
        </IconButton>
      </Box>

      <TableContainer
        sx={{ marginTop: 2, border: '1px solid #ccc', borderRadius: 1 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Crédito</TableCell>
              <TableCell>Cuotas</TableCell>
              <TableCell>Máx. Cuotas</TableCell>
              <TableCell>Comisión</TableCell>
              <TableCell align="center">Venta</TableCell>
              <TableCell align="center">Compra</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentMethods.map((method) => (
              <TableRow key={method.id}>
                <TableCell>{method.name}</TableCell>
                <TableCell>{method.credit ? 'Sí' : 'No'}</TableCell>
                <TableCell>{method.allowsInstallments ? 'Sí' : 'No'}</TableCell>
                <TableCell>
                  {method.allowsInstallments
                    ? method.maxInstallments
                    : 'No aplica'}
                </TableCell>
                <TableCell>{method.comission}</TableCell>
                <TableCell align="center">
                  {method.sell ? (
                    <CheckIcon color="success" />
                  ) : (
                    <CloseIcon color="error" />
                  )}
                </TableCell>
                <TableCell align="center">
                  {method.purchase ? (
                    <CheckIcon color="success" />
                  ) : (
                    <CloseIcon color="error" />
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(method.id)}
                    color="primary"
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(method.id)}
                    disabled={!method.canBeDeleted}
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

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>¿Qué significan los campos?</DialogTitle>
        <DialogContent>
          <Box p={1}>
            <Typography variant="body1" gutterBottom>
              <strong>Nombre:</strong> Nombre del método de pago (ejemplo:
              efectivo, tarjeta, cheque).
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Crédito:</strong> Indica si el método permite crédito (es
              decir, pagos a plazos).
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Venta:</strong> Indica si el método está disponible para
              la venta, es decir, si se puede usar para realizar pagos en el
              proceso de venta.
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Cuotas:</strong> Indica si el método permite pagos en
              cuotas.
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Máximo de Cuotas:</strong> Si permite cuotas, este es el
              número máximo de cuotas disponibles.
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Compra:</strong> Indica si el método de pago está
              habilitado para realizar compras.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleDialogClose} color="primary">
            Cerrar
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
