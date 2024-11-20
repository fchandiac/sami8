// app/Navbar.tsx
'use client';
import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Switch,
} from '@mui/material';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import MenuIcon from '@mui/icons-material/Menu';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <AppBar
      position="fixed"
      sx={{
        height: '50px',
        //backgroundColor:  pathname === '/userApp/services' ? 'background.default' : '',
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',

            width: '100%',
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
