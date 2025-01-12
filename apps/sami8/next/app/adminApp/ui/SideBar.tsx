import {
  Autocomplete,
  Box,
  Drawer,
  Grid,
  List,
  ListItem,
  MenuItem,
  TextField,
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
    <Drawer anchor="left" open={open} onClose={() => toggleDrawer(false)}>
      <Box
        sx={{
          width: 300,
        }}
      >
        <Box sx={{ mt: 1 }} role="presentation">
          <List>
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
