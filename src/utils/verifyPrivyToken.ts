// utils/verifyPrivyToken.js

import jwt, { Secret } from 'jsonwebtoken';

async function getPrivyPublicKey() {
  // Ideally, fetch the public key from a secure location or environment variable
  return process.env.PRIVY_PUBLIC_KEY as Secret;
}

export async function verifyPrivyToken(token: string) {
  try {
    const publicKey = await getPrivyPublicKey();
    const decoded = jwt.verify(token, publicKey, { algorithms: ['ES256'] });
    return { valid: true, decoded };
  } catch (error) {
    console.error('Token verification failed:', error);
    return { valid: false, error };
  }
}