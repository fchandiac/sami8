import {
  Autocomplete,
  Box,
  Drawer,
  Grid,
  List,
  ListItem,
  MenuItem,
  TextField
} from '@mui/material';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

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
    <Drawer
      anchor="left"
      open={open}
      onClose={() => toggleDrawer(false)}
      sx={{
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          // backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fondo negro semi translúcido
        },
      }}
    >
      <Box
        sx={{
          width: 300,
        }}
      >
    

        <Box sx={{ mt: 1, px: 1 }} role="presentation">
          <List>
          <ListItem>
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
            </ListItem>
            <ListItem>
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
            </ListItem>
            <ListItem>
              <MenuItem
                sx={{
                  width: '100%',
                }}
                onClick={() => {}}
              >
                Almacenes
              </MenuItem>
            </ListItem>
            <ListItem>
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
            </ListItem>
          </List>
        </Box>
      </Box>
    </Drawer>
  );
}
