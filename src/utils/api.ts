import axios from 'axios';

export const coingeckoApi = axios.create({
    baseURL: process.env.COINGECKO_BASE_URL,
    headers: {
        'x-cg-pro-api-key': process.env.COINGECKO_API_KEY || '',
    }
});
