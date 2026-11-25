'use client';

import { Coins } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { useSupportedCurrencies } from '@/hooks/useSupportedCurrencies';
import type { CurrencyCode } from '@/services/currencyService';

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  const { currencies, isLoading, error } = useSupportedCurrencies();

  if (isLoading) {
    return (
      <div aria-busy="true" className="text-sm text-muted-foreground">
        Loading currencies...
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="text-sm text-destructive">
        {error}
      </div>
    );
  }

  return (
    <label className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
      <Coins className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">Display currency</span>
      <select
        aria-label="Display currency"
        value={currency}
        onChange={(event) => setCurrency(event.target.value as CurrencyCode)}
        className="bg-transparent font-medium outline-none"
      >
        {currencies.map((currencyItem) => (
          <option key={currencyItem.code} value={currencyItem.code}>
            {currencyItem.code}
          </option>
        ))}
      </select>
    </label>
  );
}
