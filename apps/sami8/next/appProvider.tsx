import React, { createContext, useState, ReactNode, useContext } from "react";

// Interfaces para los datos del comercio y usuario
interface Commerce {
  name?: string;
  rut?: string;
  address?: string;
  liorenToken?: string;
  userId?: string;
}

interface User {
  id?: string;
  userName?: string;
  email?: string;
  role?: string;
}

// Tipo para el estado del contexto
type AppContextType = {
  commerce: Commerce | null; // Comercio actual
  user: User | null; // Usuario actual
  setCommerce: (commerce: Commerce | null) => void; // Función para actualizar comercio
  setUser: (user: User | null) => void; // Función para actualizar usuario
};

// Valores predeterminados del contexto
const defaultValues: AppContextType = {
  commerce: null,
  user: null,
  setCommerce: () => {},
  setUser: () => {},
};

// Creación del contexto
const AppContext = createContext<AppContextType>(defaultValues);

// Hook personalizado para usar el contexto
export function useAppContext() {
  return useContext(AppContext);
}

// Proveedor del contexto
export function AppProvider({ children }: { children: ReactNode }) {
  const [commerce, setCommerce] = useState<Commerce | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Valores proporcionados al contexto
  const value: AppContextType = {
    commerce,
    user,
    setCommerce,
    setUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
