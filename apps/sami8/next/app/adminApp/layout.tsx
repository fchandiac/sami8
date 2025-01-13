'use client';
import React, { useState, useEffect } from 'react';
import Navbar from './ui/Navbar';
import { ReactNode } from 'react';
import { Box } from '@mui/material';
import SideBar from './ui/SideBar';
import { useSession } from 'next-auth/react';
import { findUserByEmail } from '../actions/auth';
import App from 'next/app';
import { GlobalProvider } from '../../globalContext';

interface LayoutProps {
  children: ReactNode;
}
export default function layout({ children }: LayoutProps) {
  const [openSideBar, setOpenSideBar] = useState(false);
  const { data: session } = useSession();
  const [userId, setUserId] = useState('');


  useEffect(() => {
    const fecthUser = async () => {
      if (session?.user?.email) {
        const user = await findUserByEmail(session.user.email);
        setUserId(user.id);
      }
    };
    fecthUser();
  }, [session]);

  return (
    <>
      <GlobalProvider>
    
        <Navbar
          onMenuClick={() => {
            setOpenSideBar(true);
          }}
          userId={userId}
        />

        <Box sx={{ marginTop: '60px'}}>{children}</Box>

        <SideBar
          open={openSideBar}
          toggleDrawer={setOpenSideBar}
          userId={userId}
        />
      </GlobalProvider>
    </>
  );
}
