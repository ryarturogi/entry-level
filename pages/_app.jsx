import '@/styles/globals.css';
import { Provider } from 'react-redux';

import Layout from '@/components/Layout';
import { AuthProvider } from '@/hooks/useAuthUser';
import { store } from '@/store/index';

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </Provider>
  );
}

export default App;
