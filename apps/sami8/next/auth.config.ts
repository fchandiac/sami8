import { NextAuthConfig } from 'next-auth';
import { AuthError } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { use } from 'react';

export default {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        userName: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const { userName, password } = credentials;

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}/signIn`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'socket-id': 'frontEnd',
              },
              body: JSON.stringify({ userName, password }),
            },
          );

          // Verificar si la respuesta no es exitosa
          if (response.status !== 201) {
            throw new Error('Invalid credentials');
          }

          const user = await response.json(); // Parsear la respuesta como JSON
          return user;
        } catch (error) {
          console.log('Authorization Error:', error);
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
