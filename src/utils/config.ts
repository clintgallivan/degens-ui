// app environment
export const isProd = process.env.APP_ENV === 'production';

// database names
export const database = isProd ? 'prod' : 'dev';
export const prodDatabase = 'prod';
export const devDatabase = 'dev';

