import axios from 'axios';
import { AxiosError } from 'axios';
import { getSession } from 'next-auth/react';
import jwt from 'jsonwebtoken';

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

export const serverApi = axios.create({
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor
serverApi.interceptors.request.use((config) => {
  // Get the session from somewhere. This depends on your application.
  const session = getSession();

  const payload = {
    app: 'Degens',
    uid: session?.uid || '',
    // You can add more data here
  };

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  const jwtSecret = process.env.JWT_SECRET;
  // Sign the token with your secret
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: '30s' // Token will expire in 1 hour
  });

  // Add the token to the headers
  if (config.headers) {
    config.headers['x-auth-token'] = token;
  }

  return config;
}, (error) => {
  // Do something with request error
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