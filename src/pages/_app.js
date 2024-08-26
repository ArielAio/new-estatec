import '../styles/globals.css';
import Layout from '../../components/Layout';
import Script from 'next/script'; // Importa o componente Script do Next.js

function MyApp({ Component, pageProps }) {
  return (
    <>
     
      <Script id="botsonic-script" strategy="afterInteractive">
        {`
          (function (w, d, s, o, f, js, fjs) {
            w["botsonic_widget"] = o;
            w[o] =
            w[o] ||
            function () {
              (w[o].q = w[o].q || []).push(arguments);
            };
            (js = d.createElement(s)), (fjs = d.getElementsByTagName(s)[0]);
            js.id = o;
            js.src = f;
            js.async = 1;
            fjs.parentNode.insertBefore(js, fjs);
          })(window, document, "script", "Botsonic", "https://widget.botsonic.com/CDN/botsonic.min.js");

          Botsonic("init", {
            serviceBaseUrl: "https://api-azure.botsonic.ai",
            token: "c4c38a33-213e-44f6-9d2e-973b6ef75809",
          });
        `}
      </Script>
      
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
