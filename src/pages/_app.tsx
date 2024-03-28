import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/design_tokens.scss";
import "../styles/globals.scss";
import "../styles/utilities.scss";
import { useEffect } from "react";
import type { AppContext, AppInitialProps, AppProps } from "next/app";
import { useRouter } from "next/router";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";
import { TokenProvider } from "../context/tokenContext";
import { LayoutProvider } from "../context/layoutContext";
import * as gtag from "../utils/gtag";
import { ToastProvider } from "@context/toastContext";
import { headers } from "next/headers";
import { GetServerSideProps } from "next";
import App from "next/app";
import { PrivyProvider } from "@privy-io/react-auth";

type AppOwnProps = { example: string };

function MyApp({ Component, pageProps }: AppProps & AppOwnProps) {
    console.log(process?.env?.PRIVY_APP_ID);
    const router = useRouter();
    useEffect(() => {
        const handleRouteChange = (url: string) => {
            gtag.pageview(url);
        };
        router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    return (
        <>
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <Script
                id="gtag-loader"
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
            />
            <Script id="gtag-config" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gtag.GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                    });
                `}
            </Script>
            <PrivyProvider
                appId="cluacjxrr04aq404cilia8lin"
                config={{
                    // Customize Privy's appearance in your app
                    appearance: {
                        theme: "light",
                        accentColor: "#676FFF",
                        logo: "https://your-logo-url",
                    },
                    // Create embedded wallets for users who don't have a wallet
                    // embeddedWallets: {
                    //     createOnLogin: "users-without-wallets",
                    // },
                }}
            >
                <SessionProvider session={pageProps.session}>
                    <TokenProvider>
                        <LayoutProvider>
                            <ToastProvider>
                                <Component {...pageProps} />
                            </ToastProvider>
                        </LayoutProvider>
                    </TokenProvider>
                </SessionProvider>
            </PrivyProvider>
        </>
    );
}

export default MyApp;
