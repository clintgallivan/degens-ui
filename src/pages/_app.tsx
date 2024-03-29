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
import LogoIcon from "../../public/DegensLogo.svg";
import { clientApi } from "@utils/api";
import { log } from "@utils/console";
import { AuthProvider } from "@context/authContext";
// import LogoIcon from "../../public/Degen-Tab-Logo-Square.png";

type AppOwnProps = { example: string };

function MyApp({ Component, pageProps }: AppProps & AppOwnProps) {
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

    const handleAuthSuccess = async (e: any) => {
        try {
            const userReq = {
                uid: e.id,
                name: "Anon",
            };
            const res = await clientApi.post("api/users", userReq);
            return res;
        } catch (e) {
            log(e);
        }
    };

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
                appId={`${process.env.NEXT_PUBLIC_PRIVY_APP_ID}`}
                config={{
                    appearance: {
                        theme: "dark",
                        logo: `${process.env.NEXT_PUBLIC_BASE_URL}/DegensLogo.svg`,
                    },
                }}
                onSuccess={(e) => handleAuthSuccess(e)}
            >
                <SessionProvider session={pageProps.session}>
                    <TokenProvider>
                        <LayoutProvider>
                            <AuthProvider>
                                <ToastProvider>
                                    <Component {...pageProps} />
                                </ToastProvider>
                            </AuthProvider>
                        </LayoutProvider>
                    </TokenProvider>
                </SessionProvider>
            </PrivyProvider>
        </>
    );
}

export default MyApp;
