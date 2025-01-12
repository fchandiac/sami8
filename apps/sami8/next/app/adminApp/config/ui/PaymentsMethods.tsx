'use client';
import React, { useState, useEffect } from 'react';
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
  Alert,
  Grid,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import HelpIcon from '@mui/icons-material/Help';
import { useGlobalContext } from '@/globalContext';
import { deletePymentMethod } from '@/app/actions/paymentsMethods';
import NewPymentMethodForm from './PymentMethodForm';
import PaymentMethodForm from './PymentMethodForm';

export default function PaymentsMethods() {
  const { commerce } = useGlobalContext();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [openinfoDialog, setOpeninfoDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openNewPaymentMethodDialog, setOpenNewPaymentMethodDialog] =
    useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);

  useEffect(() => {
    //@ts-ignore
    setPaymentMethods(commerce.userCommerce?.paymentMethods || []);
  }, [commerce]);


  const deletePymentMethodProccess = async (id: string) => {
    console.log(`Deleting payment method with id: ${id}`);
    await deletePymentMethod(id);
    await commerce.updateSetCommerce();

    // Implementar lógica de eliminación aquí
  };

  return (
    <>
      <Box justifyContent={'space-between'} display={'flex'}>
        <Typography variant="h6" gutterBottom flexGrow={1}>
          Métodos de pago
        </Typography>
        <IconButton
          color="primary"
          aria-label="add"
          onClick={() => setOpenNewPaymentMethodDialog(true)}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="help"
          onClick={() => setOpeninfoDialog(true)}
        >
          <HelpIcon />
        </IconButton>
      </Box>

      <TableContainer
        sx={{ marginTop: 2, border: '1px solid #ccc', borderRadius: 1 }}
      >
        <Table>
          <TableHead
            sx={{
              backgroundColor: '#f5f5f5',
              '& > *': {
                fontWeight: 'bold',
              },
            }}
          >
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
                  disabled= { (method.name === 'Efectivo') ? true : false}
                    onClick={() => {
                      setSelectedPaymentMethod(method);
                      setOpenUpdateDialog(true);
                    
                    }}
          
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setSelectedPaymentMethod(method);
                      setOpenDeleteDialog(true);
                    }}
                    disabled={!method.canBeDeleted}
           
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

      <Dialog open={openinfoDialog} onClose={() => setOpeninfoDialog(false)}>
        <Box p={2}>
          <Typography variant="h6" gutterBottom flexGrow={1}>
            ¿Qué significan los campos?
          </Typography>
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
              <strong>Compra:</strong> Indica si el método de pago está
              habilitado para realizar compras.
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Cuotas:</strong> Indica si el método permite pagos en
              cuotas.
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Máximo de Cuotas:</strong> Si permite cuotas, este es el
              número máximo de cuotas disponibles.
            </Typography>
          </Box>
        </Box>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <Box p={2}>
          <Grid container spacing={2} direction={'column'}>
            <Grid item>
              <Typography variant="h6" gutterBottom>
                ¿Estás seguro de eliminar el método de pago{' '}
                <strong>{selectedPaymentMethod?.name}</strong>?
              </Typography>
            </Grid>
            <Grid item>
              <Alert severity="warning">
                Esta acción no se puede deshacer. Si eliminas este método de
                pago, no podrás recuperarlo.
              </Alert>
            </Grid>
            <Grid item textAlign={'right'}>
              <Button
                variant="contained"
                onClick={async () => {
                  console.log('Deleting payment method');
                  if (selectedPaymentMethod?.id) {
                    await deletePymentMethodProccess(selectedPaymentMethod.id);
                  }
                  setOpenDeleteDialog(false);
                }}
              >
                Eliminar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
      <Dialog
        open={openNewPaymentMethodDialog}
        onClose={() => setOpenNewPaymentMethodDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <NewPymentMethodForm 
          afterSubmit={() => {
            setOpenNewPaymentMethodDialog(false);
            commerce.updateSetCommerce();
          }}
          commerceId={commerce.userCommerce?.id || ''}
        
         />
      </Dialog>

      <Dialog
        open={openUpdateDialog}
        onClose={() => setOpenUpdateDialog(false)}
        fullWidth
        maxWidth="sm"
        >
          <PaymentMethodForm
            afterSubmit={() => {
              setOpenUpdateDialog(false);
              commerce.updateSetCommerce();
            }}

            commerceId={commerce.userCommerce?.id || ''}
            update
            id={selectedPaymentMethod?.id || ''}
            name={selectedPaymentMethod?.name || ''}
            credit={selectedPaymentMethod?.credit || false}
            sell={selectedPaymentMethod?.sell || false}
            purchase={selectedPaymentMethod?.purchase || false}
            allowsInstallments={selectedPaymentMethod?.allowsInstallments}
            maxInstallments={selectedPaymentMethod?.maxInstallments || 0}
            comission={selectedPaymentMethod?.comission || 0}
          />
        </Dialog>
    </>
  );
}

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
