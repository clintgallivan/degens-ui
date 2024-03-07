import axios from 'axios';
import { AxiosError } from 'axios';

export const coingeckoApi = axios.create({
    baseURL: process.env.COINGECKO_BASE_URL,
    headers: {
        'x-cg-pro-api-key': process.env.COINGECKO_API_KEY || '',
    }
});

export const internalApi = axios.create({
    baseURL: '/api',
});

interface ErrorData {
    message: string;
    status: string;
  }

interface CustomAxiosError {
  message: string;
  name: string;
  config: object;
  code?: string;
  status?: number;
  data?: {
    message: string
    status: string
  };
}

export function toAxiosError(error: any): CustomAxiosError | undefined {
    if (error && error.isAxiosError) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as ErrorData;
      return {
        message: axiosError.message,
        name: axiosError.name,
        config: axiosError.config,
        code: axiosError.code,
        status: axiosError.response?.status,
        data: {
          message: errorData?.message || '',
          status: errorData?.status || '',
        },
      };
    }
    return undefined;
  }