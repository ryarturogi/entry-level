import React from 'react'
import { wrapper } from '@/api/store'

import { UserContextProvider } from '@/hooks/useAuthUser'
import '@/styles/globals.css'

const App = ({ Component, pageProps }) => {
  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  )
}

export default wrapper.withRedux(App)
