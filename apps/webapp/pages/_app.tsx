import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to webapp!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>

      <div className="absolute bottom-0 right-0 z-99 pb-2 pr-2">
        <p id="release-version" className='text-right'>{process.env.NEXT_PUBLIC_RELEASE_VERSION || 'NEXT_PUBLIC_RELEASE_VERSION'}</p>
      </div>
    </>
  );
}

export default CustomApp;
