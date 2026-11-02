import React, { createContext, useContext } from 'react';
import { usePortfolioData } from '../lib/store';

type PortfolioContextType = ReturnType<typeof usePortfolioData>;

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const data = usePortfolioData();
  return <PortfolioContext.Provider value={data}>{children}</PortfolioContext.Provider>;
};

export function usePortfolio(): PortfolioContextType {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}

