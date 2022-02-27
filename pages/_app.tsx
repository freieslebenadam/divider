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
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  )
}

export default MyApp
