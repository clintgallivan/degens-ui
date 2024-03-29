import { NextConfig } from 'next';
import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};

export function middleware(request: NextRequest) {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    const cspHeader = `
      default-src 'self';
      img-src 'self' data: https://pbs.twimg.com https://assets.coingecko.com ${process.env.NEXT_PUBLIC_BASE_URL};
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://challenges.cloudflare.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' https://www.google-analytics.com ${process.env.NEXT_PUBLIC_BASE_URL} https://auth.privy.io wss://relay.walletconnect.com wss://relay.walletconnect.org wss://www.walletlink.org https://*.rpc.privy.systems https://*.infura.io https://*.blastapi.io;
      frame-ancestors 'self';
      frame-src 'self' https://auth.privy.io https://verify.walletconnect.com https://verify.walletconnect.org https://challenges.cloudflare.com;
      child-src 'self' https://auth.privy.io https://verify.walletconnect.com https://verify.walletconnect.org;
      `.replace(/\s{2,}/g, ' ').trim();
      
      // TODO: add nonce script once figured out how to pass nonce into scrip tag in _app.tsx or _document.tsx. Pages can access nonce from headers.
      // script-src 'self' 'unsafe-eval' 'unsafe-inline' 'nonce-${nonce}' https://www.googletagmanager.com;
      const contentSecurityPolicyHeaderValue = cspHeader
      .replace(/\s{2,}/g, ' ')
      .trim()
   
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-nonce', nonce)
   
    requestHeaders.set(
      'Content-Security-Policy',
      contentSecurityPolicyHeaderValue
    )
   
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
    response.headers.set(
      'Content-Security-Policy',
      contentSecurityPolicyHeaderValue
    )
   
    return response
  }
