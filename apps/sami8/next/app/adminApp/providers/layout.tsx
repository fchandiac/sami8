"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, Tab, Box } from "@mui/material";

export default function ProvidesLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // Definir pestañas y rutas
  const tabs = [
    { label: "Provedores", path: "/adminApp/providers" },
    { label: "Cuentas", path: "/adminApp/providers/account" },
    { label: "Compras", path: "/adminApp/providers/purchases" },
  ];

  // Determinar qué pestaña está activa
  const currentTab = tabs.findIndex((tab) => pathname === tab.path);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    router.push(tabs[newValue].path); // Cambiar la ruta al hacer clic en una pestaña
  };

  return (
    <Box>
      {/* Barra de pestañas sticky */}
      <Tabs
        value={currentTab}
        onChange={handleChange}
        aria-label="Product Tabs"
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          paddingX: 2,
          position: 'sticky',
          top: 60,
          zIndex: 1000, // Asegurar que la barra esté por encima de otros elementos
          bgcolor: 'background.paper', // Fondo para que no sea transparente
          boxShadow: 1, // Opcional: sombra para resaltar la barra
        }}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>

      {/* Contenido principal */}
      <Box sx={{ marginTop: 2 }}>{children}</Box>
    </Box>
  );
}
