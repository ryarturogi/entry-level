import '@/styles/globals.css';
import { Provider } from 'react-redux';

import Layout from '@/components/Layout';
import { AuthProvider } from '@/hooks/useAuthUser';
import { store } from '@/store/index';
import { ToastContainer, toast } from 'react-toastify';

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
      <ToastContainer
        autoClose={1800}
        closeOnClick
        hideProgressBar
        limit={10}
        pauseOnHover
        className="text-base"
        position={toast.POSITION.BOTTOM_RIGHT}
        role="alert"
      />
    </Provider>
  );
}

export default App;
