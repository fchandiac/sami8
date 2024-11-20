'use client';
import { Button, Dialog, Box, Typography } from '@mui/material';
import React, { useState } from 'react';

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
          <Typography variant="h5" align="left" pb={2}>
            Nuevo Comercio
          </Typography>
        </Box>
      </Dialog>
    </>
  );
}
