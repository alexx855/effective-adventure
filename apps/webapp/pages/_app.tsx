// import { AppProps } from 'next/app';
// import Link from 'next/link';
import Head from 'next/head';

import './styles.css';

function CustomApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Welcome to effective adventure!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>

      <div className="absolute bottom-0 right-0 z-99 pb-2 pr-2">
        <p id="release-info" className="text-right">
          {process.env.NEXT_PUBLIC_VERSION || 'development'}
        </p>
      </div>
    </>
  );
}

export default CustomApp;
