'use client';
import React, { useState, useEffect } from 'react';
import Navbar from './ui/Navbar';
import { ReactNode } from 'react';
import { Box } from '@mui/material';
import SideBar from './ui/SideBar';
import { useSession } from 'next-auth/react';
import { findUserByEmail } from '../actions/auth';

interface LayoutProps {
  children: ReactNode;
}
export default function layout({ children }: LayoutProps) {
  const [openSideBar, setOpenSideBar] = useState(false);
  const { data: session } = useSession();
  const [commerces, setCommerces] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchCommerces = async () => {
      const email = session?.user?.email;
      if (!email) {
        console.error('User email is undefined');
        return;
      }
      const user = await findUserByEmail(email);
      setUserId(user.id);
      const commerces = user.commerces;
      if (commerces) {
        setCommerces(commerces);
      }
    };

    if (session) {
      fetchCommerces();
    }
  }, [session]);

  return (
    <>
      <Navbar
        onMenuClick={() => {
          setOpenSideBar(true);
        }}
      />
      <Box sx={{ marginTop: '60px', px: 1 }}>{children}</Box>

      <SideBar
        open={openSideBar}
        toggleDrawer={setOpenSideBar}
        commerces={commerces}
        userId={userId}
      />
    </>
  );
}
