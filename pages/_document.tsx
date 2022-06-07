/* eslint-disable @next/next/google-font-display */
import Document, { Html, Head, NextScript, Main } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-br">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Maven+Pro:wght@400;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link rel="icon" href="/favicon.ico" />

        <Head />
        <body>
          <Main />
          <NextScript />

          <div id="notification"></div>
          <div id="modal"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
