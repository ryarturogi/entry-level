import '@/styles/globals.css';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from '@/components/Layout';
import { AuthProvider } from '@/hooks/useAuthUser';
import { store } from '@/store/index';

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer
            autoClose={1800}
            closeOnClick
            hideProgressBar
            limit={10}
            pauseOnHover
            position={toast.POSITION.BOTTOM_RIGHT}
            role="alert"
          />
        </Layout>
      </AuthProvider>
    </Provider>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])
  ),
};

export default App;
