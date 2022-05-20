import '../styles/globals.scss';
import '../styles/design_tokens.scss';
import '../styles/utilities.scss';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
