'use client';
import React, { useState, useEffect } from 'react';
import CustomerForm from './ui/CustomerForm';
import { useGlobalContext } from '@/globalContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import AppDataGrid from '@/components/appDataGrid/AppDataGrid';
import { findAllCustomersByCommerceId } from '@/app/actions/customers';

interface RowData {
  id: string;
  name: string;
  rut: string;
  socialReason: string;
  address: string;
  phone: string;
  email: string;
  state: string;
  city: string;
}

export default function CustomersPage() {
  const { commerce } = useGlobalContext();
  const [customersList, setCustomersList] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [rowData, setRowData] = useState({} as RowData);
  const [gridApiRef, setGridApiRef] = useState(null);

  const fetchCustomers = async () => {
    if (commerce.userCommerce.id) {
      const customers = await findAllCustomersByCommerceId(commerce.userCommerce.id as string);
      setCustomersList(customers);
    }
  };

  useEffect(() => {
    if (commerce.userCommerce.id) {
      fetchCustomers();
    }
  }, [commerce]);

  const columns = [
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'name', headerName: 'Nombre', flex: 1 },
    { field: 'rut', headerName: 'Rut', flex: 1 },
    { field: 'socialReason', headerName: 'Razón Social', flex: 1 },
    { field: 'address', headerName: 'Dirección', flex: 1 },
    { field: 'phone', headerName: 'Teléfono', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'state', headerName: 'Estado', flex: 1 },
    { field: 'city', headerName: 'Ciudad', flex: 1 },
    {
      field: 'actions',
      headerName: '',
      width: 100,
      sortable: false, // Deshabilita el ordenamiento
      filterable: false, // Deshabilita los filtros
      disableColumnMenu: true, // Oculta el menú de la columna
      renderCell: (params: any) => {
        return (
          <>
            <IconButton
              onClick={() => {
                setRowData(params.row);
                setOpenEditDialog(true);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                // deleteCategory(params.row.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
      <AppDataGrid
        columns={columns}
        rows={customersList}
        setGridApiRef={setGridApiRef}
        FormComponent={CustomerForm}
        refresh={fetchCustomers}
      />
    </>
  );
}
