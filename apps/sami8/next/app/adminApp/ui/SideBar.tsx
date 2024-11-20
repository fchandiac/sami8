import { Box, Drawer, Grid, List, ListItem, MenuItem } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import SelectCommerce from './SelectCommerce';

interface UserSideBarProps {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
  commerces: any[];
  userId: string;
}

export default function SideBar({
  open,
  toggleDrawer,
  commerces = [],
  userId = 'defaultUserId',
}: UserSideBarProps) {
  const router = useRouter();

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={() => toggleDrawer(false)}
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          // backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fondo negro semi translúcido
        },
      }}
    >
      <Box sx={{ mt: 1, px: 1 }} role="presentation">
        <SelectCommerce userId={userId} commerces={commerces} />
      </Box>

      <Box sx={{ mt: 1, px: 1 }} role="presentation">
        <List>
          <ListItem>
            <MenuItem
              sx={{
                width: '100%',
              }}
              onClick={() => {
                router.push('/adminApp/commerces');
                toggleDrawer(false);
              }}
            >
              Comercios
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
    </Drawer>
  );
}
