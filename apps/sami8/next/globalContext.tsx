import React, { createContext, ReactNode, useContext } from 'react';
import { useCommerce } from './hooks/useCommerce';
import { useAlert } from './hooks/useAlert';

// Tipo del contexto
type GlobalContextType = {
  commerce: ReturnType<typeof useCommerce>;
  showAlert: (message: string, severity: "success" | "error" | "info" | "warning") => void;
  AlertComponent: JSX.Element | null;
};

// Crear el contexto
export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined,
);

// Tipo de las props del Provider
type GlobalProviderProps = {
  children: ReactNode;
};

// Crear el Provider
export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const commerce = useCommerce();
  const { showAlert, AlertComponent } = useAlert();

  return (
    <GlobalContext.Provider value={{ commerce, showAlert, AlertComponent }}>
      {children}
      {AlertComponent}
    </GlobalContext.Provider>
  );
};

// Hook para consumir el contexto de forma segura
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext debe usarse dentro de GlobalProvider');
  }
  return context;
};
