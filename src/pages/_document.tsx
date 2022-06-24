import { Html, Head, Main, NextScript } from 'next/document';

export default function MyDocument() {
  return (
    <Html>
      <Head>
        <title>Degen Analytics | Crypto</title>
        <meta name="author" content="Degen Analytics" />
        <meta
          name="description"
          content="Crypto Analytics for Degens. Marketing, Development, Social, and other stats on cryptocurrency projects."
        />
        <meta
          name="keywords"
          content="Degen, Analytics, Crypto, Cryptocurrency, Tokens, Investing, Stats, Traders, Bitcoin, Ethereum, Defi, NFT"
        />
        <meta
          property="og: description"
          content="Crypto Analytics for Degens. Marketing, Development, Social, and other stats on cryptocurrency projects."
        />
        <meta property="og: title" content="Degen Analytics" />
        <meta property="og: image" content="https://degen-analytics.com" />
        <meta property="og: type" content="website" />
        <meta property="og: url" content="https://degen-analytics.com" />
        <meta
          name="google-site-verification"
          content="VE2Ceq8AFbAIfpmbhnPzqA1YWusQ0dE-_ULrUirzgeY"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href="/Degen-Tab-Logo-Square.png"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TCW0KG7M1R', { page_path: window.location.pathname });
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
