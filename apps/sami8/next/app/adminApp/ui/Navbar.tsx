'use client';
import { useState, useEffect, use } from 'react';
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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useGlobalContext } from '@/globalContext';
import { findCommerceByUserId } from '../../actions/commerces';

interface NavbarProps {
  onMenuClick: () => void;
  userId: string;
}

export default function Navbar({ onMenuClick, userId }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const { commerce } = useGlobalContext();

  useEffect(() => {
    if (pathname === '/adminApp/config') {
      setPageTitle('Configuración');
    } else if (pathname === '/adminApp/products') {
      setPageTitle('Productos');
    } else if (pathname === '/userApp/clients') {
      setPageTitle('Clientes');
    } else if (pathname === '/userApp/employees') {
      setPageTitle('Empleados');
    } else if (pathname === '/userApp/transactions') {
      setPageTitle('Transacciones');
    }
  }, [pathname]);




  useEffect(() => {
    const fetchData = async () => {
      await commerce.findCommerceByUserAndSetUserComerce(userId);
    };
    fetchData();
  }, [userId]);

  return (
    <AppBar
      position="fixed"
      sx={{
        height: '60px',
        //backgroundColor:  pathname === '/userApp/services' ? 'background.default' : '',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          fontSize={{
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 12,
          }}
          fontWeight={300}
          component="div"
          sx={{ color: 'white', width: '100%' }}
        >
          @{commerce.userCommerce.identity}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            width: '100%',
          }}
        >
          <Typography
           
            fontWeight={300}
            component="div"
            sx={{ color: 'white', width: '100%' }}
            textAlign={'right'}
          >
            {pageTitle}
          </Typography>

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
