import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/fav.png" />

          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-S0648M85HN"
          />

          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id='G-93NWLELNJZ'`}
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `              
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());            
              gtag('config', 'G-S0648M85HN');              
          `,
            }}
          />

          <script
            type="text/javascript"
            src="https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
