// utils/verifyPrivyToken.js

import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

async function getPrivyPublicKey() {
  // Ideally, fetch the public key from a secure location or environment variable
  return process.env.PRIVY_PUBLIC_KEY as Secret;
}

export async function verifyPrivyToken(token: string) {
  try {
    const publicKey = await getPrivyPublicKey();
    const decoded: JwtPayload = jwt.verify(token, publicKey, { algorithms: ['ES256'] }) as JwtPayload;
    return { valid: true, decoded };
  } catch (error) {
    // console.error('Token verification failed:', error);
    return { valid: false, error };
  }
}