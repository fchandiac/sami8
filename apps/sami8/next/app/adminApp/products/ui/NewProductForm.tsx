'use client';
import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Grid,
  IconButton,
  TextField,
  Typography,
  Box,
  Paper,
  InputLabel,
  FormControl,
  Button,
} from '@mui/material';
import { useGlobalContext } from '@/globalContext';
import { findAllCategoriesByCommerceId } from '@/app/actions/categories';
import { findAllTaxesByCommerceId } from '@/app/actions/taxes';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface ProductFormProps {
  afterSubmit?: () => void;
  gridApiRef?: any;
  refreshData?: () => void;
}

interface Tax {
  id: string;
  name: string;
  percentage: number;
  sell: boolean;
  purchase: boolean;
  canBeDeleted?: boolean;
  commerceId: string;
}

interface Product {
  id: string;
  name: string;
  folioNumber: number | null;
  description: string;
  commerceId: string;
  categoryId: string;
  purchaseNetPrice: number;
  purchaseGrossPrice: number;
  taxes: Tax[];
  salePrices: SalePrice[];
  code: string;
}

interface SalePrice {
  id: string;
  price: number;
  currency: string;
  productId: string;
  commerceId: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string | null;
  name: string;
  description: string;
  familyId: string;
  familyName: string;
}

export default function NewProductForm() {
  const [formData, setFormData] = React.useState<Product>({
    id: '',
    name: '',
    folioNumber: null,
    description: '',
    commerceId: '',
    categoryId: '',
    purchaseNetPrice: 0,
    purchaseGrossPrice: 0,
    taxes: [],
    salePrices: [],
    code: '',
  });

  const { commerce } = useGlobalContext();
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [taxesList, setTaxesList] = useState<Tax[]>([]);
  const [productTaxesList, setProductTaxesList] = useState<Tax[]>([]);
  const [selectedTax, setSelectedTax] = useState<Tax | null>(null);

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

  const fetchTaxes = async () => {
    const taxes = await findAllTaxesByCommerceId({
      commerceId: commerce.userCommerce.id || '',
    });

    setTaxesList(taxes);
  };

  useEffect(() => {
    fetchCategories();
    fetchTaxes();
  }, []);

  useEffect(() => {
    if (taxesList.length > 0) {
      setSelectedTax(taxesList[0]); // Selecciona el primer elemento
    }
  }, [taxesList]);

  useEffect(() => {
    calculateGrossPrice();
    calculateNetPrice();
  }, [productTaxesList]);

  const calculateGrossPrice = () => {
    const taxesPercentage = productTaxesList.reduce(
      (acc, tax) => acc + tax.percentage,
      0,
    );

    const purchaseNetPrice = formData.purchaseNetPrice;
    const grossPrice =
      purchaseNetPrice + (purchaseNetPrice * taxesPercentage) / 100;

    setFormData({ ...formData, purchaseGrossPrice: grossPrice });
  };

  const calculateNetPrice = () => {
    const taxesPercentage = productTaxesList.reduce(
      (acc, tax) => acc + tax.percentage,
      0,
    );

    const purchaseGrossPrice = formData.purchaseGrossPrice;
    const netPrice = purchaseGrossPrice / (1 + taxesPercentage / 100);

    setFormData({ ...formData, purchaseNetPrice: netPrice });
  };

  const addTax = () => {
    if (selectedTax) {
      const taxExists = productTaxesList.find((t) => t.id === selectedTax.id);
      if (taxExists) {
        return;
      }

      setProductTaxesList([...productTaxesList, selectedTax]);
    }
  };

  const removeTax = (tax: Tax) => {
    setProductTaxesList(productTaxesList.filter((t) => t.id !== tax.id));
  };

  return (
    <>
      <Grid container spacing={1} direction={'column'}>
        <Grid item>
          <Typography variant="h5">Nuevo Producto</Typography>
        </Grid>

        <Grid item>
          <TextField
            label="Nombre"
            id="flow-store-product-name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item>
          <Grid direction={'row'} spacing={1} container>
            <Grid item xs={12} sm={6} display={'flex'}>
              <Autocomplete
                options={taxesList}
                value={selectedTax}
                getOptionLabel={(option) => option.name}
                onChange={(e, newValue) => {
                  setSelectedTax(newValue);
                }}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Asociar Impuesto"
                    size="small"
                    sx={{ flexGrow: 1 }}
                  />
                )}
              />
              <IconButton
                sx={{
                  width: 40, // Tamaño fijo del botón
                  height: 40, // Tamaño fijo del botón
                  flexShrink: 0, // Evita que crezca o se deforme
                  marginLeft: 1, // Espacio entre el botón y el input
                }}
                onClick={() => {
                  addTax();
                }}
              >
                <AddIcon />
              </IconButton>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper
                variant="outlined"
                sx={{ padding: 1, borderColor: '#ccc' }}
              >
                <Typography variant="subtitle2" sx={{}}>
                  Impuestos asociados
                </Typography>
                {productTaxesList.map((tax) => (
                  <Grid item>
                    <Box
                      key={tax.id}
                      display="flex"
                      alignItems="center"
                      px={2}
                      mb={1}
                      borderRadius={8}
                      bgcolor="grey.200"
                      sx={{
                        border: '1px solid grey',

                        '&:hover': { bgcolor: 'grey.300' },
                      }}
                    >
                      <Typography fontSize={12} mr={1} sx={{ flexGrow: 1 }}>
                        {tax.name}
                      </Typography>
                      <IconButton
                        sx={{
                          '&:hover': {
                            backgroundColor: 'transparent', // Quita el color de fondo al hacer hover
                          },
                        }}
                        size="small"
                        onClick={() => {
                          removeTax(tax);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid direction={'row'} spacing={1} container>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Precio de compra (ref.) neto"
                value={formData.purchaseNetPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    purchaseNetPrice: parseInt(e.target.value),
                  })
                }
                size="small"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Precio de compra (ref.) con impuestos"
                value={formData.purchaseGrossPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    purchaseGrossPrice: parseInt(e.target.value),
                  })
                }
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <TextField
            label="Descripción"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            size="small"
            fullWidth
            multiline
            rows={2}
          />
        </Grid>

        <Grid item>
          <Grid direction={'row'} spacing={1} container>
            <Grid item xs={12} sm={6}>
              <TextField
                label="folio interno"
                value={formData.purchaseNetPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    purchaseNetPrice: parseInt(e.target.value),
                  })
                }
                size="small"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={categoriesList}
                getOptionLabel={(option) => option.name}
                value={categoriesList.find(
                  (category) => category.id === formData.categoryId,
                )}
                onChange={(e, newValue) => {
                  setFormData({ ...formData, categoryId: newValue?.id ?? '' });
                }}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Categoría"
                    size="small"
                    sx={{ flexGrow: 1 }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <TextField
            label="Código"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item textAlign={'right'}>
          <Button variant="contained">
            Guardar
          </Button>
          </Grid>
      </Grid>
    </>
  );
}
