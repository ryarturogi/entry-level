import React from 'react'
import { Provider } from 'react-redux'
import { wrapper, store } from '@/store/store'
import { UserContextProvider } from '@/hooks/useAuthUser'
import '@/styles/globals.css'

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </Provider>
  )
}

export default wrapper.withRedux(App)
