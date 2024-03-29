import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/design_tokens.scss';
import '../styles/globals.scss';
import '../styles/utilities.scss';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { SessionProvider } from 'next-auth/react';
import { TokenProvider } from '../context/tokenContext';
import { LayoutProvider } from '../context/layoutContext';
import * as gtag from '../utils/gtag';
import { ToastProvider } from '@context/toastContext';
// import { headers } from 'next/headers';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    useEffect(() => {
        const handleRouteChange = (url: string) => {
            gtag.pageview(url);
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    // const nonce = headers().get('x-nonce');

    return (
        <>
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <Script
                id="gtag-loader"
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
            />
            <Script
                id="gtag-config"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
                }}
            />
            <SessionProvider session={pageProps.session}>
                <TokenProvider>
                    <LayoutProvider>
                        <ToastProvider>
                            <Component {...pageProps} />
                        </ToastProvider>
                    </LayoutProvider>
                </TokenProvider>
            </SessionProvider>
        </>
    );
}

export default MyApp;
