"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, Tab, Box } from "@mui/material";

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // Definir pestañas y rutas
  const tabs = [
    { label: "Productos", path: "/adminApp/products" },
    { label: "Categorías", path: "/adminApp/products/categories" },
    { label: "Pestaña 3", path: "/productos/tab3" },
  ];

  // Determinar qué pestaña está activa
  const currentTab = tabs.findIndex((tab) => pathname === tab.path);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    router.push(tabs[newValue].path); // Cambiar la ruta al hacer clic en una pestaña
  };

  return (
    <Box>
      <Tabs value={currentTab} onChange={handleChange} aria-label="Product Tabs">
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>
      <Box sx={{ marginTop: 2 }}>{children}</Box>
    </Box>
  );
}
