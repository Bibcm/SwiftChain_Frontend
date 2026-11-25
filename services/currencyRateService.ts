import axios from '@/lib/httpClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

export interface CurrencyRateResponse {
  fiat: string;
  xlmRate: number;
  updatedAt: string;
}

export interface FiatCurrency {
  code: string;
  symbol?: string;
  name?: string;
}

export const currencyRateService = {
  async getXlmRate(fiat: string): Promise<CurrencyRateResponse> {
    const { data } = await axios.get<CurrencyRateResponse>(
      `${API_BASE_URL}/api/rates/xlm`,
      {
        params: { fiat },
      }
    );

    if (
      !data ||
      typeof data.fiat !== 'string' ||
      typeof data.xlmRate !== 'number' ||
      typeof data.updatedAt !== 'string'
    ) {
      throw new Error('Invalid currency rate response');
    }

    return data;
  },

  async getSupportedCurrencies(): Promise<FiatCurrency[]> {
    const response = await fetch(`${API_BASE_URL}/api/rates/currencies`);
    if (!response.ok) {
      throw new Error(`Failed to fetch currencies: ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : data.currencies ?? [];
  },
};
