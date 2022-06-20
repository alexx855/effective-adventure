import { AppProps } from 'next/app';
import Head from 'next/head';
import { Layout } from '@whitehoneypot/ui';
import { Provider } from 'react-redux';
import store from '../app/store';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Head>
                <title>Welcome to effective adventure!</title>
            </Head>

            <main className="app">
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </main>
        </Provider>
    );
}

export default CustomApp;
