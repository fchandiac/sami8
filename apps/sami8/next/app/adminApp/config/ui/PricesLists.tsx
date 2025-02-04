'use client';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalContext } from '@/globalContext';

interface PriceList {
  id: string;
  name: string;
  canBeDeleted: boolean;
}


export default function PricesLists() {
  const { commerce } = useGlobalContext();
  const [priceLists, setPriceLists] = useState<PriceList[]>([]);

  useEffect(() => {
    if (commerce) {
      setPriceLists(commerce.userCommerce.pricesLists);
    }
  }, [commerce.userCommerce]);



  return (
    <>
      <Box justifyContent={'space-between'} display={'flex'}>
        <Typography variant="h6" gutterBottom flexGrow={1}>
          Listas de precios
        </Typography>
        <IconButton
          color="primary"
          aria-label="add"
          onClick={() => {}}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <TableContainer
        sx={{ marginTop: 2, border: '1px solid #ccc', borderRadius: 1 }}
      >
        <Table>
          <TableHead
            sx={{
              backgroundColor: '#f5f5f5',
              '& > *': {
                fontWeight: 'bold',
              },
            }}
          >
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {priceLists.map((list) => (
              <TableRow key={list.id}>
                <TableCell>{list.name}</TableCell>
          
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end', // Alinea los íconos a la derecha
                      gap: 1, // Añade espacio entre los íconos
                    }}
                  >
                    <IconButton
                      onClick={() => {
                       
                      }}
               
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                      
                      }}
                      disabled={!list.canBeDeleted}
              
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
     
    </>
  );
}
