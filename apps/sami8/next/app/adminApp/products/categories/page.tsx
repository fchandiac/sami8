'use client';
import { Box, Dialog, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CategoryForm from './ui/CategoryForm';
import AppDataGrid from '@/components/appDataGrid/AppDataGrid';
import { findAllCategoriesByCommerceId } from '@/app/actions/categories';
import { useGlobalContext } from '@/globalContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


interface RowData {
  id: string;
  name: string;
  description: string;
  familyId: string;
}

export default function page() {
  const { commerce } = useGlobalContext();
  const [categoriesList, setCategoriesList] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [rowData, setRowData] = useState({} as RowData);
  const [gridApiRef, setGridApiRef] = useState(null);

  const fetchCategories = async () => {
    const categories = await findAllCategoriesByCommerceId(
      commerce.userCommerce.id || '',
    );

    const cat = categories.map((category: any) => {
      return {
        ...category,
        id: category.id,
        name: category.name,
        description: category.description,
        familyId: category.family.id,
        familyName: category.family.name,
      };
    });

    setCategoriesList(cat);
  };

  useEffect(() => {
    fetchCategories();
  }, [commerce.userCommerce.id]);

  const columns = [
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'name', headerName: 'Nombre', flex: 1 },
    { field: 'description', headerName: 'Descripción', flex: 1 },
    { field: 'familyName', headerName: 'Familia', flex: 1 },
    {
      field: 'actions',
      headerName: '',
      width: 100,
      sortable: false, // Deshabilita el ordenamiento
      filterable: false, // Deshabilita los filtros
      disableColumnMenu: true, // Oculta el menú de la columna
      renderCell: (params: any) => (
        <>
          <IconButton size="small" onClick={() => {
            setRowData({
              ...rowData,
        id: params.row.id,
        name: params.row.name,
        description: params.row.description,
        familyId:params.row.family.id,
  
            })
            
          setOpenEditDialog(true)
          }}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" onClick={() => {}}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <Box
        sx={{
          padding: 2,
        }}
      >
        <AppDataGrid
          columns={columns}
          rows={categoriesList}
          title=""
          FormComponent={CategoryForm}
          refresh={fetchCategories}
          setGridApiRef={setGridApiRef}
        />
      </Box>

      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        fullWidth
      >
        <Box p={1}>
          <CategoryForm
            afterSubmit={() => {
              setOpenEditDialog(false);
            }}
            update={true}
            id={rowData.id}
            name={rowData.name}
            description={rowData.description}
            familyId={rowData.familyId}
            gridApiRef={gridApiRef}
          />
        </Box>
      </Dialog>
    </>
  );
}
