'use client';
import React, { useState, useEffect, useContext } from 'react';

export type Balances = Record<string, number>;

type AssetContextType = {
  balances: Balances;
  deposit: (asset: string, amount: number) => void;
  withdraw: (asset: string, amount: number) => void;
};

const AssetContext = React.createContext<AssetContextType | undefined>(undefined);

const STORAGE_KEY = 'asset-balances';

export const AssetProvider = ({ children }: { children: React.ReactNode }) => {
  const [balances, setBalances] = useState<Balances>({ BTC: 0, USD: 0 });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setBalances(JSON.parse(stored));
      } catch {
        // ignore parsing errors
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(balances));
  }, [balances]);

  const deposit = (asset: string, amount: number) => {
    setBalances((prev) => ({ ...prev, [asset]: (prev[asset] || 0) + amount }));
  };

  const withdraw = (asset: string, amount: number) => {
    setBalances((prev) => ({ ...prev, [asset]: (prev[asset] || 0) - amount }));
  };

  return (
    <AssetContext.Provider value={{ balances, deposit, withdraw }}>
      {children}
    </AssetContext.Provider>
  );
};

export const useAssets = () => {
  const ctx = useContext(AssetContext);
  if (!ctx) throw new Error('useAssets must be used within AssetProvider');
  return ctx;
};
