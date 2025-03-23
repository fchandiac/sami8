'use client';
import React, { useState, useEffect } from 'react';
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
  Typography,
  Dialog,
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
import { User } from '@/hooks/useUsers';

import { useGlobalContext } from '@/globalContext';

const usersList: User[] = [
  {
    id: '1',
    userName: 'user1',
    name: 'User 1',
    email: 'mail@mail.com',
    role: 'user',
    commerceId: '1',
  },
  {
    id: '2',
    userName: 'user2',
    name: 'User 2',
    email: 'test@test.com',
    role: 'user',
    commerceId: '1',
  },
];

export default function UserPage() {
  const { commerce } = useGlobalContext();
  // const [openinfoDialog, setOpeninfoDialog] = useState(false);
  const [openNewTaxdialog, setOpenNewTaxDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const [seletectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    setUsers(usersList);
  }, []);

  const deleteTaxHandler = async () => {};

  return (
    <>
      <Box justifyContent={'space-between'} display={'flex'}>
        <Typography variant="h6" gutterBottom flexGrow={1}>
          Usuarios
        </Typography>
        <IconButton
          color="primary"
          aria-label="add"
          onClick={() => setOpenNewTaxDialog(true)}
        >
          <AddIcon />
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
              <TableCell
                sx={{
                  position: 'sticky',
                  left: 0, // Fija la celda al lado izquierdo
                  backgroundColor: '#f5f5f5', // Fondo fijo para evitar transparencias al desplazar
                  zIndex: 2, // Prioridad visual sobre otras celdas
                }}
              >
                Nombre de usuario
              </TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Email</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell
                  sx={{
                    position: 'sticky',
                    left: 0, // Fija la celda al lado izquierdo
                    backgroundColor: '#fff', // Fondo fijo para evitar transparencias al desplazar
                    zIndex: 2, // Prioridad visual sobre otras celdas
                  }}
                >
                  {user.userName}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end', // Alinea los íconos a la derecha
                      gap: 1, // Añade espacio entre los íconos
                    }}
                  >
                    <IconButton onClick={() => {}} aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => {}} aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openNewTaxdialog}
        onClose={() => setOpenNewTaxDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <Box p={1}></Box>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <Box p={2}>
          <Grid container spacing={2} direction={'column'}>
            <Grid item>
              <Typography variant="h6" gutterBottom>
                ¿Estás seguro de eliminar el usuario{' '}
                <strong>{seletectedUser?.name}</strong>?
              </Typography>
            </Grid>
            <Grid item>
              <Alert severity="warning">
                Esta acción no se puede deshacer. Si eliminas este usuario, no
                podrás recuperarlo.
              </Alert>
            </Grid>
            <Grid item textAlign={'right'}>
              <Button
                variant="contained"
                onClick={() => {
                  deleteTaxHandler();
                }}
              >
                Eliminar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>

      <Dialog
        open={openUpdateDialog}
        onClose={() => setOpenUpdateDialog(false)}
        fullWidth
        maxWidth="sm"
      ></Dialog>
    </>
  );
}

// interface Tax {
//   id: string;
//   name: string;
//   percentage: number;
//   canBeDeleted: boolean;
//   sell: boolean;
//   purchase: boolean;
// }

// const initialTaxes: Tax[] = [
//   {
//     id: '1',
//     name: 'IVA',
//     percentage: 19,
//     canBeDeleted: false,
//     sell: true,
//     purchase: true,
//   },
//   {
//     id: '2',
//     name: 'Impuesto sobre la renta',
//     percentage: 25,
//     canBeDeleted: true,
//     sell: true,
//     purchase: true,
//   },
//   {
//     id: '3',
//     name: 'Impuesto de propiedad',
//     percentage: 10,
//     canBeDeleted: true,
//     sell: false,
//     purchase: false,
//   },
// ];
