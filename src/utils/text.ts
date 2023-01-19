// import { PaymentCurrencyLogo } from '~models/payments'

export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function currencyString(value: string, currency: string) {
    if (currency === 'USD') {
        return `$${parseFloat(value).toFixed(2)}`;
    }
    if (currency === 'EUR') {
        return `€${parseFloat(value).toFixed(2)}`;
    }
    return `${parseFloat(value).toFixed(2)} ${currency}`;
}

export function toFixedNumber(number: number, digits = 0) {
    return +number.toFixed(digits);
}
