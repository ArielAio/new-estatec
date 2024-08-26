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
            token: "8396e932-6981-4c8e-83ce-7f578dcdcd9c",
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
