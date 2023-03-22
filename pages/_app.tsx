import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import Layout from '@/components/partials/Layout';
import { AppProps } from '@/types';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;
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

export default App;
