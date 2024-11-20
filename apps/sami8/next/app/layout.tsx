import type { Metadata } from 'next';
import './globals.css';
import MuiApp from '@/mui/MuiApp';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'sami8',
  description: 'FlowStore',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <SessionProvider>
          <MuiApp>{children}</MuiApp>
        </SessionProvider>
      </body>
    </html>
  );
}
