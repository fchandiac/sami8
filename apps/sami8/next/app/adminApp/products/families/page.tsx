'use client';
import React, { useState, useEffect } from 'react';
import { Box, Dialog, IconButton } from '@mui/material';
import FamilyForm from './ui/FamilyForm';
import AppDataGrid from '@/components/appDataGrid/AppDataGrid';
import { useGlobalContext } from '@/globalContext';
import { findAllFamiliesByCommerceId } from '@/app/actions/families';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


interface RowData {
  id: string;
  name: string;
  description: string;
  commerceId: string;
}

export default function page() {
  const { commerce } = useGlobalContext();
  const [familiesList, setFamiliesList] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [ rowData, setRowData ] = useState({} as RowData);
  const [gridApiRef, setGridApiRef] = useState(null);

  const fetchFamilies = async () => {
    const families = await findAllFamiliesByCommerceId(
      commerce.userCommerce.id || '',
    );
    setFamiliesList(families);
  };

  useEffect(() => {
    fetchFamilies();
  }, [commerce.userCommerce.id]);


  const columns = [
    { field: 'id', headerName: 'Id', flex: 1, hide: true },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    {
      field: 'actions',
      headerName: '',
      width: 100,
      sortable: false, // Deshabilita el ordenamiento
      filterable: false, // Deshabilita los filtros
      disableColumnMenu: true, // Oculta el menú de la columna
      renderCell: (params: any) => (
        <>
          <IconButton
             size='small'
            onClick={() => {
              setRowData(params.row);
              setOpenEditDialog(true);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
             size='small'
           onClick={() => {}}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <Box p={1}>
        <AppDataGrid
          columns={columns}
          rows={familiesList}
          title=""
          FormComponent={FamilyForm}
          refresh={fetchFamilies}
          setGridApiRef={setGridApiRef}
        />
      </Box>
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}  fullWidth>
        <Box p={1}>
          <FamilyForm
            afterSubmit={() => {
              setOpenEditDialog(false)
           

            }}
            id={rowData.id}
            name={rowData.name}
            description={rowData.description}
            commerceId={rowData.commerceId}
            update= {true}
            gridApiRef={gridApiRef}
          />
        </Box>
      </Dialog>
    </>
  );
}
