// app/Navbar.tsx
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
import { useAppContext } from '@/appProvider';
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
  const [commerceName, setCommerceName] = useState('');
  
  const { commerce, setCommerce } = useAppContext();

  useEffect(() => {
    console.log('userId:', userId);
    const fetchData = async () => {
      const userCommerce = await findCommerceByUserId(userId);
      setCommerceName(userCommerce.name);
      setCommerce(userCommerce);

      console.log('Commerce:', userCommerce);
      
    };
    fetchData();
  }, [userId]);

  return (
    <AppBar
      position="fixed"
      sx={{
        height: '50px',
        //backgroundColor:  pathname === '/userApp/services' ? 'background.default' : '',
      }}
    >
      <Toolbar>
        <Typography

          variant="h6"
          component="div"
          sx={{  color: 'white', width: '100%' }}
        >
          {commerceName}
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
