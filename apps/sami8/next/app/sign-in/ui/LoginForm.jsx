'use client';
import { use, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import {
  Grid,
  TextField,
  Box,
  Button,
  Typography,
  Alert,
  Dialog,
} from '@mui/material';
import { findUserByEmail } from '@/app/actions/auth';


export default function LoginForm() {
  const [error, setError] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene la recarga de la página
    setLoading(true);
    setError(null);

    // Obtener los datos del formulario
    const formData = new FormData(e.target);
    const userName = formData.get('userName');
    const password = formData.get('password');

    // Simular un pequeño retraso para la experiencia del usuario
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Intentar iniciar sesión usando el método 'signIn'
    const response = await signIn('credentials', {
      userName: userName,
      password: password,
      redirect: false, // Evita redirección automática por el método signIn
    });

    // Verificar si hubo un error en la respuesta
    if (response?.error) {
      setError('Credenciales incorrectas');
      setLoading(false);
    } else {
      await session;
  
      const mail = session.user.email;
      const user = await findUserByEmail(mail);

      if (user.role === 'admin') {
      router.push('/adminApp');
      } else {
        router.push('/salePointApp');
      }
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            pt: 30,
            px: {
              xs: '0vw',
              sm: '20vw',
              md: '25vw',
              lg: '35vw',
              xl: '40vw',
            }, // Padding ajustable para diferentes tamaños de pantalla
            boxSizing: 'border-box', // Asegura que el padding no afecte el ancho total
          }}
        >
          <Grid container spacing={1} direction={'column'} p={1}>
            <Grid item>
              <TextField
                label="Nombre de usuario"
                variant="outlined"
                name="userName"
                fullWidth
                required
              />
            </Grid>
            <Grid item>
              <TextField
                label="Contraseña"
                variant="outlined"
                name="password"
                fullWidth
                type="password"
                required
              />
            </Grid>
            <Grid item>
              {error && (
                <Alert
                  severity="error"
                  sx={{
                    border: '1.5px solid red',
                    borderRadius: 1,
                    color: '#1d1d1d',
                  }}
                >
                  {error}
                </Alert>
              )}
            </Grid>

            <Grid item>
              <Button
                disabled={loading}
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  height: 45,
                }}
              >
                Ingresar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
}
