import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/design_tokens.scss';
import '../styles/globals.scss';
import '../styles/utilities.scss';
import type { AppProps } from 'next/app';
import { TokenProvider } from '../context/tokenContext';
import { LayoutProvider } from '../context/layoutContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TokenProvider>
      <LayoutProvider>
        <Component {...pageProps} />
      </LayoutProvider>
    </TokenProvider>
  );
}

export default MyApp;
