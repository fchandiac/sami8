import { Box, Divider, IconButton, Typography } from '@mui/material';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Barcode from 'react-barcode';
import MoreIcon from '@mui/icons-material/More';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import RemoveIcon from '@mui/icons-material/Remove';
import WidgetsIcon from '@mui/icons-material/Widgets';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

interface ProductCardProps {
  id?: string;
}

export default function ProductCard({ id }: ProductCardProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 1,
        borderRadius: 1,
        bgcolor: '#ffffff',
        border: '1px solid #ccc',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Typography fontSize={12} color="#757575">
            id: {'khj7876kja8jk.ioauil'}
          </Typography>
          <Typography fontSize={12} color="#757575">
            Folio interno: {2340}
          </Typography>
          <Typography variant="h6" color="#212121">
            Product Name
          </Typography>
          <Typography fontSize={12} color="#424242">
            <strong>Código: </strong>
            {'88987wj098w89wjma999'}
          </Typography>
          <Typography fontSize={12} color="#424242">
            <strong>$ de compra </strong>
            {' $ 200 (ref.)'}
          </Typography>
          <Typography fontSize={12} color="#424242">
            <strong>Categoría: </strong>
            {'Pisco'}
          </Typography>
          <Typography fontSize={12} color="#424242">
            <strong>Familía: </strong>
            {'Licores'}
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            <IconButton
              sx={{
                padding: 0,
                '&:hover': {
                  backgroundColor: 'transparent', // Cambia este color al que prefieras
                },
              }}
            >
              <FavoriteBorderOutlinedIcon />
            </IconButton>
            <IconButton
              sx={{
                padding: 0,
                '&:hover': {
                  backgroundColor: 'transparent', // Cambia este color al que prefieras
                },
              }}
            >
              <WidgetsIcon />
            </IconButton>

            <IconButton
              sx={{
                padding: 0,
                '&:hover': {
                  backgroundColor: 'transparent', // Cambia este color al que prefieras
                },
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              sx={{
                padding: 0,
                '&:hover': {
                  backgroundColor: 'transparent', // Cambia este color al que prefieras
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
          <Barcode value="817898798278729892b" width={0.8} fontSize={10} />
        </Box>
      </Box>

      <Divider sx={{ marginY: 1 }} />

      <Box
        sx={{
          display: {
            xs: 'block',
            sm: 'flex',
          },
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            border: '1px solid #ccc',
            borderRadius: 1,
            padding: 1,
            mr: 0.5,
            mb: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <Typography fontSize={12} gutterBottom>
              <strong>Precios</strong>
            </Typography>
            <IconButton
              sx={{
                padding: 0,
                '&:hover': {
                  backgroundColor: 'transparent', // Cambia este color al que prefieras
                },
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: 'flex',
              border: '1px solid #ccc',
              borderRadius: 1,
              padding: 1,
              alignItems: 'center',
            }}
          >
            <Typography fontSize={10} mr={1} flexGrow={1}>
              <strong>Minorista</strong>
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography fontSize={10} ml={1} mr={1}>
              {(1200).toLocaleString('es-CL', {
                style: 'currency',
                currency: 'CLP',
              })}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <IconButton
              sx={{
                ml: 1,
                padding: 0,
                '&:hover': {
                  backgroundColor: 'transparent', // Cambia este color al que prefieras
                },
              }}
            >
              <EditIcon
                sx={{
                  fontSize: 16,
                }}
              />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            border: '1px solid #ccc',
            borderRadius: 1,
            padding: 1,
            ml: 0.5,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <Typography fontSize={12} gutterBottom>
              <strong>Stock Almacenes</strong>
            </Typography>
            <IconButton
              sx={{
                padding: 0,
                '&:hover': {
                  backgroundColor: 'transparent', // Cambia este color al que prefieras
                },
              }}
            >
              <MoreIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: 'flex',
              border: '1px solid #ccc',
              borderRadius: 1,
              padding: 1,
              alignItems: 'center',
            }}
          >
            <Typography fontSize={10} mr={1} flexGrow={1}>
              <strong>Sala de Ventas</strong>
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography fontSize={10} ml={1} mr={1}>
              {100}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <IconButton
              sx={{
                ml: 1,
                padding: 0,
                '&:hover': {
                  backgroundColor: 'transparent', // Cambia este color al que prefieras
                },
              }}
            >
              <AddIcon
                sx={{
                  fontSize: 16,
                }}
              />
            </IconButton>
            <IconButton
              sx={{
                padding: 0,
                '&:hover': {
                  backgroundColor: 'transparent', // Cambia este color al que prefieras
                },
              }}
            >
              <CompareArrowsIcon
                sx={{
                  fontSize: 16,
                }}
              />
            </IconButton>
            <IconButton
              sx={{
                padding: 0,
                '&:hover': {
                  backgroundColor: 'transparent', // Cambia este color al que prefieras
                },
              }}
            >
              <RemoveIcon
                sx={{
                  fontSize: 16,
                }}
              />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
