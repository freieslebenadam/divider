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
          <meta name="description" content="Rozpočítávání účtů během pár kliknutí. Přidejte položky z účtu, přiřaďte dělitele a je to." />
          <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="apple-mobile-web-app-title" content="Divider" />
          <meta name="application-name" content="Divider" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#dde2ec" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  )
}

export default MyApp
