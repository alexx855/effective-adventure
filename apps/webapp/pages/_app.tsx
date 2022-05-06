import Head from 'next/head';
import { Layout } from '@whitehoneypot/ui';
// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging";


import './styles.css';

function CustomApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Welcome to effective adventure!</title>
      </Head>

      <main className="app">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>

    </>
  );
}

export default CustomApp;
