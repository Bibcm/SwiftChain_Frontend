'use client';

import { useEffect, useState } from 'react';
import { currencyRateService, FiatCurrency } from '@/services/currencyRateService';

export function useSupportedCurrencies() {
  const [currencies, setCurrencies] = useState<FiatCurrency[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadCurrencies() {
      setIsLoading(true);
      setError(null);
      try {
        const items = await currencyRateService.getSupportedCurrencies();
        if (active) {
          setCurrencies(items);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Unable to load currencies');
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadCurrencies();
    return () => {
      active = false;
    };
  }, []);

  return { currencies, isLoading, error };
}