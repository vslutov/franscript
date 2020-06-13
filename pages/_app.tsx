import Head from 'next/head'

import 'normalize.css/normalize.css'
import './styles.css'
import styles from './App.module.css'

export default ({ Component, pageProps }) => (
  <div className={styles.page}>
    <Head>
      <title>Franscript</title>

      <link rel='icon' href={`${process.env.ASSET_PREFIX}/favicon.ico`} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta httpEquiv='content-language' content='ru' />
    </Head>

    <Component {...pageProps} />
  </div>
)
