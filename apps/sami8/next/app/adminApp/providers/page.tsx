'use client'
import React , {useState, useEffect} from 'react'
import { useGlobalContext } from '@/globalContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import AppDataGrid from '@/components/appDataGrid/AppDataGrid';
import { findAllProvidersByCommerceId } from '@/app/actions/providers';



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


export default function ProvidersPage() {
   const { commerce } = useGlobalContext();
  const [providersList, setProvidersList] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [rowData, setRowData] = useState({} as RowData);
  const [gridApiRef, setGridApiRef] = useState(null);

  const fetchProviders = async () => {
    if (commerce.userCommerce.id) {
      const providers = await findAllProvidersByCommerceId(commerce.userCommerce.id as string);
      setProvidersList(providers);
    }
  };

  useEffect(() => {
    if (commerce.userCommerce.id) {
      fetchProviders();
    }
  }, [commerce]);


  return (
    <>
      <AppDataGrid
        columns={[
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
                      setRowData(params.row as RowData);
                      setOpenEditDialog(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </>
              );
            },
          },
        ]}
        rows={providersList}
      
      />
    </>
  )
}
