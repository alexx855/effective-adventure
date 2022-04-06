import { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';

import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
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
          {process.env.NEXT_PUBLIC_VERSION || 'development'}{' '}
          {process.env.NEXT_PUBLIC_IPFS_CID && (
            <Link href="https://ipfs-effective-adventure.alexpedersen.dev/">
              <a
                id="ipfs-cid"
                className="text-right"
                target="_blank"
                rel="noreferrer"
              >
                IPFS CID {process.env.NEXT_PUBLIC_IPFS_CID}
              </a>
            </Link>
          )}
        </p>
      </div>
    </>
  );
}

export default CustomApp;
