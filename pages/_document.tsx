import { Head, Html, Main, NextScript } from 'next/document';

const Document = (): JSX.Element => {
  return (
    <Html>
      <Head />
      <link href="/favicon.ico" rel="shortcut icon" />
      <link href="/favicon.ico" rel="icon" type="image/x-icon" />
      <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
      <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
      <link href="/apple-touch-icon.png" rel="apple-touch-icon" />
      <link href="/android-chrome-192x192.png" rel="icon" sizes="192x192" />
      <link href="/android-chrome-512x512.png" rel="icon" sizes="512x512" />
      <link href="/site.webmanifest" rel="manifest" />
      <link href="https://use.typekit.net/ooy8veu.css" rel="stylesheet" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
