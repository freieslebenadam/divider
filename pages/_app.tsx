import '../styles/globals.css'
import '../styles/tailwind.css'
import type { AppProps } from 'next/app'
import { Layout } from "../components"
import ContextProvider from "../context"
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Layout>
        <Head>
          <meta name="description" content="Make dividing bills and receipts between people easier with Divider. Add people, you want to divide items between. Add items and their prices, that you wish to divide. Asign people to the individual items in your list. Click on receipt icon in the top right to see how much everyone owns. And finally... Make them pay!" />
          <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2" />
          <link rel="manifest" href="/site.webmanifest?v=2" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg?v=2" color="#6366f1" />
          <link rel="shortcut icon" href="/favicon.ico?v=2" />
          <meta name="apple-mobile-web-app-title" content="Divider" />
          <meta name="application-name" content="Divider" />
          <meta name="msapplication-TileColor" content="#6366f1" />
          <meta name="theme-color" content="#dde2ec" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  )
}

export default MyApp
