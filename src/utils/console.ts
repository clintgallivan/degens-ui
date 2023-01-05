/* eslint-disable no-console */
export const log = (message?: unknown, arg: unknown = ''): void =>
    arg !== '' ? console.log(message, arg) : console.log(message);

export const warn = (message?: unknown, arg: unknown = ''): void =>
    arg !== '' ? console.warn(message, arg) : console.warn(message);

export const error = (message?: unknown, arg: unknown = ''): void =>
    arg !== '' ? console.error(message, arg) : console.error(message);
