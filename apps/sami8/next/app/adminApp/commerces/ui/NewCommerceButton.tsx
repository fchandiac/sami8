'use client';
import { Button, Dialog, Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import NewCommerceForm from './NewCommerceForm';

export default function NewCommerceButton() {
  const [openNewCommerceDialog, setOpenNewCommerceDialog] = useState(false);
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenNewCommerceDialog(true)}
      >
        nuevo comercio
      </Button>
      <Dialog
        open={openNewCommerceDialog}
        onClose={() => setOpenNewCommerceDialog(false)}
      >
        <Box p={1}>
          <NewCommerceForm />
        </Box>
      </Dialog>
    </>
  );
}
