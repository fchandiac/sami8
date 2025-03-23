import {
  Autocomplete,
  Avatar,
  Box,
  Drawer,
  Grid,
  List,
  ListItem,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import StorefrontIcon from '@mui/icons-material/Storefront';



interface UserSideBarProps {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
  userId: string;
}

export default function SideBar({
  open,
  toggleDrawer,
  userId = 'defaultUserId',
}: UserSideBarProps) {
  const router = useRouter();

  return (
    <Drawer anchor="left" open={open} onClose={() => toggleDrawer(false)}>
      <Box
        sx={{
          width: 300,
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          <Avatar
            sx={{
              width: 120,
              height: 120,
              margin: 'auto',
              bgcolor: '#424242',
              borderColor: '#212121',
              borderStyle: 'solid',
              borderWidth: 10,
              mt: 3,
              mb: 3,
            }}
          >
            <StorefrontIcon
              sx={{
                fontSize: 80,
                color: '#fafafa',
              }}
            />
          </Avatar>
          <Typography variant="h6">AdminApp</Typography>
        </Box>
        <Box sx={{ mt: 1 }} role="presentation">
          <List>
            <MenuItem
              sx={{
                width: '100%',
              }}
              onClick={() => {
                router.push('/adminApp/products');
                toggleDrawer(false);
              }}
            >
              Productos
            </MenuItem>

            <MenuItem
              sx={{
                width: '100%',
              }}
              onClick={() => {
                router.push('/adminApp/sale-points');
                toggleDrawer(false);
              }}
            >
              Puntos de Venta
            </MenuItem>

            <MenuItem
              sx={{
                width: '100%',
              }}
              onClick={() => {
                router.push('/adminApp/sale-points');
                toggleDrawer(false);
              }}
            >
              Compras
            </MenuItem>

            <MenuItem
              sx={{
                width: '100%',
              }}
              onClick={() => {
                router.push('/adminApp/sale-points');
                toggleDrawer(false);
              }}
            >
              Ventas
            </MenuItem>

            <MenuItem
              sx={{
                width: '100%',
              }}
              onClick={() => {
                router.push('/adminApp/customers');
                toggleDrawer(false);
              }}
            >
              Clientes
            </MenuItem>

            <MenuItem
              sx={{
                width: '100%',
              }}
              onClick={() => {
                router.push('/adminApp/providers');
                toggleDrawer(false);
              }}
            >
              Proveedores
            </MenuItem>

            <MenuItem
              sx={{
                width: '100%',
              }}
              onClick={() => {
                router.push('/adminApp/users');
                toggleDrawer(false);
              }}
            >
              Usuarios
            </MenuItem>

            <MenuItem
              sx={{
                width: '100%',
              }}
              onClick={() => {
                router.push('/adminApp/config');
                toggleDrawer(false);
              }}
            >
              Configuración
            </MenuItem>

            <MenuItem
              sx={{
                width: '100%',
              }}
              onClick={() => {
                signOut();
              }}
            >
              Cerrar Sesión
            </MenuItem>
          </List>
        </Box>
      </Box>
    </Drawer>
  );
}
