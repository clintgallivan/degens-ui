import jwt from 'jsonwebtoken';
import { LocalStorageKey } from 'src/types/localStorage';

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

// Function to get the token from local storage
export const getTokenFromStorage = (localStorageKey: LocalStorageKey): string | null => {
  return localStorage.getItem(localStorageKey);
};

// Function to save the token in local storage
export const saveTokenInStorage = (token: string, localStorageKey: LocalStorageKey): void => {
  localStorage.setItem(localStorageKey, token);
};

// Function to remove the token from local storage
export const removeTokenFromStorage = (localStorageKey: LocalStorageKey): void => {
  localStorage.removeItem(localStorageKey);
};

// Function to check if the token is expired
export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  const decoded: DecodedToken = jwt.decode(token) as DecodedToken;
  const now = Date.now() / 1000; // Convert to seconds
  return decoded.exp < now;
};
