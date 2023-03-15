import '@/styles/globals.css';
import Layout from '@/components/Layout';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ Component, pageProps }) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      initialSession={pageProps.initialSession}
      supabaseClient={supabaseClient}
    >
      <Layout>
        <Component {...pageProps} />
        <ToastContainer
          autoClose={1800}
          closeOnClick
          hideProgressBar
          limit={10}
          pauseOnHover
          position={toast.POSITION.TOP_RIGHT}
          role="alert"
        />
      </Layout>
    </SessionContextProvider>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App;
