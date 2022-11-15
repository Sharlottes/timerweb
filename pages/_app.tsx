import type { AppProps } from 'next/app'
import Head from 'next/head';
import 'public/global.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>타이머</title>
      <meta name="description" content="타이머!" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet" />
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
