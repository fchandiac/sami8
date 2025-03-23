'use client';
import React, { useState, useEffect } from 'react';
import {
  DataGrid,
  GridToolbarQuickFilter,
  useGridApiContext,
} from '@mui/x-data-grid';
import {
  Box,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DownloadIcon from '@mui/icons-material/Download';
import esESGrid from './translate';

interface FormComponentProps {
  afterSubmit: () => void;
}

interface AppDataGridProps {
  rows?: any[];
  columns?: any[];
  title?: string;
  FormComponent?: React.FC<FormComponentProps>; // Componente opcional para el formulario
  refresh?: () => void;
  setGridApiRef?: (apiRef: any) => void;
}

interface CustomToolbarProps {
  title?: string;
  onOpenDialog?: () => void; // Nueva función para abrir el diálogo
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({
  title = '',
  onOpenDialog,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2,
        gap: 2,
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarQuickFilter variant="outlined" size="small" />
      <IconButton aria-label="Nuevo" onClick={onOpenDialog}>
        <AddCircleIcon />
      </IconButton>
    </Box>
  );
};

interface CustomFooterProps {
  setGridApiRef: (apiRef: any) => void;
}

const CustomFooter: React.FC<CustomFooterProps> = ({
  setGridApiRef,
}) => {

  const apiRef = useGridApiContext();

  useEffect(() => {
    setGridApiRef(apiRef);
  }, []);


  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 2,
        gap: 2,
        borderTop: '1px solid #ccc',
      }}
    >
      <DownloadIcon />
    </Box>
  );
};

export default function AppDataGrid({
  rows = [],
  columns = [],
  title = '',
  FormComponent, // Recibe el componente como prop opcional
  refresh,
  setGridApiRef = () => {},
}: AppDataGridProps) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleRefresh = () => {
    if (typeof refresh === 'function') {
      refresh();
    }
  };

  return (
    <>
      <DataGrid
        sx={{
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: 1,
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: '1px solid #ccc', // Borde inferior del header
          },
        }}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
        rows={rows}
        columns={columns}
        localeText={esESGrid}
        density="compact"
        getRowHeight={() => 'auto'}
        slots={{
          toolbar: () => (
            <CustomToolbar title={title} onOpenDialog={handleOpenDialog} />
          ),
          footer: () => <CustomFooter 
            setGridApiRef={setGridApiRef}
          />,
        }}
      />

      {/* Dialog para mostrar el formulario */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <Box
          sx={{
            padding: 1,
          }}
        >
          {FormComponent ? (
            <FormComponent
              afterSubmit={() => {
                handleCloseDialog();
                handleRefresh();
              }}
            />
          ) : (
            <Typography>No hay formulario disponible</Typography>
          )}
        </Box>
      </Dialog>
    </>
  );
}
