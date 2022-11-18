import type { AppProps } from 'next/app'
import Head from 'next/head';
import 'public/global.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>타이머 생성기</title>
      <meta name="description" content="타이머 임베드를 생성해보세요! 카운트다운 시각과 색, 타이틀을 설정하여 iframe 임베드를 생성할 수 있습니다." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
