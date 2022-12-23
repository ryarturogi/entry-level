import '@/styles/globals.css';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import Layout from '@/components/Layout';
import { AuthProvider } from '@/hooks/useAuthUser';
import { store } from '@/store/index';
import { toast, ToastContainer } from 'react-toastify';

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
      <ToastContainer
        autoClose={1800}
        className="text-base"
        closeOnClick
        hideProgressBar
        limit={10}
        pauseOnHover
        position={toast.POSITION.BOTTOM_RIGHT}
        role="alert"
      />
    </Provider>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App;
