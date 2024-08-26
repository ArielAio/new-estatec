import '../styles/globals.css';
import Layout from '../../components/Layout';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script src="//code.tidio.co/ifdcvczkyhkwdeyum9kijyd9o9tkdccl.js" async></script>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
