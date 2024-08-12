import { Provider } from 'react-redux'
import '../styles/globals.css'
import store from '../redux/store/store'
import { Layout } from '../components'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}