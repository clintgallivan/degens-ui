import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/design_tokens.scss";
import "../styles/globals.scss";
import "../styles/utilities.scss";
import { useEffect, useState } from "react";
import type { AppContext, AppInitialProps, AppProps } from "next/app";
import { useRouter } from "next/router";
import Script from "next/script";
import { TokenProvider } from "../context/tokenContext";
import { LayoutProvider } from "../context/layoutContext";
import * as gtag from "../utils/gtag";
import { ToastProvider, useToast } from "@context/toastContext";
import { headers } from "next/headers";
import { GetServerSideProps } from "next";
import App from "next/app";
import { PrivyProvider, User } from "@privy-io/react-auth";
import LogoIcon from "../../public/DegensLogo.svg";
import { clientApi } from "@utils/api";
import { log } from "@utils/console";
import { SystemInfoProvider, useSystemInfoContext } from "@context/SystemInfoContext";
import AuthSuccessHandler from "@utils/auth/authSuccessHandler";
import { SessionProvider } from "@context/SessionContext";
import { authWithDegensCoreApiNode } from "@utils/auth/authenticateClient";

type AppOwnProps = { example: string };

function MyApp({ Component, pageProps }: AppProps & AppOwnProps) {
    const router = useRouter();
    const [privyUser, setPrivyUser] = useState<User | null>(null);
    useEffect(() => {
        const handleRouteChange = (url: string) => {
            gtag.pageview(url);
        };
        router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    useEffect(() => {
        authWithDegensCoreApiNode();
    }, []);

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
            <SystemInfoProvider>
                <PrivyProvider
                    appId={`${process.env.NEXT_PUBLIC_PRIVY_APP_ID}`}
                    config={{
                        appearance: {
                            theme: "dark",
                            logo: `${process.env.NEXT_PUBLIC_BASE_URL}/DegensLogo.svg`,
                            accentColor: "#373D9D",
                            walletList: ["phantom"],
                        },
                        loginMethods: ["email", "google", "apple", "twitter", "sms"],
                    }}
                    onSuccess={(privyUser: User) => setPrivyUser(privyUser)}
                >
                    <SessionProvider>
                        <TokenProvider>
                            <LayoutProvider>
                                <ToastProvider>
                                    <AuthSuccessHandler privyUser={privyUser} />
                                    <Component {...pageProps} />
                                </ToastProvider>
                            </LayoutProvider>
                        </TokenProvider>
                    </SessionProvider>
                </PrivyProvider>
            </SystemInfoProvider>
        </>
    );
}

export default MyApp;
