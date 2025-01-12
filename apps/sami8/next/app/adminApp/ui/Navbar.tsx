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
          fontSize={18}
          fontWeight={300}
          component="div"
          sx={{ color: 'white', width: '100%' }}
        >
          @{commerce.userCommerce.identity} - {commerce.userCommerce.name}
        </Typography>

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
