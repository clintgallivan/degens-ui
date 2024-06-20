import axios from 'axios';
import { AxiosError } from 'axios';
import { getTokenFromStorage } from './token';
import { LocalStorageKey } from 'src/types/localStorage';

export const coingeckoApi = axios.create({
    baseURL: process.env.COINGECKO_BASE_URL,
    headers: {
        'x-cg-pro-api-key': process.env.COINGECKO_API_KEY || '',
    }
});

export const clientApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'x-auth-token': process.env.NEXT_PUBLIC_SHARED_SECRET || '',
    }
});

export const nodeCoreApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DEGENS_CORE_API_NODE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'x-auth-token': process.env.NEXT_PUBLIC_SHARED_SECRET || '',
    }
});

nodeCoreApi.interceptors.request.use((config) => {
  // Get the token from local storage
  const token = typeof window !== 'undefined' ? getTokenFromStorage(LocalStorageKey.DEGENS_CORE_API_NODE_TOKEN) : null;

  // If the token is present and config.headers is defined, add it to the request headers
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  // If there's an error in setting the request headers, it's handled here
  return Promise.reject(error);
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