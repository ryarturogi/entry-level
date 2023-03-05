import Footer from '@/components/partials//Footer';
import Header from '@/components/partials/Header';
import useStore from '@/lib/store';
import { useUser } from '@supabase/auth-helpers-react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Layout = ({ children }) => {
  const user = useUser;
  const setInitialState = useStore((state) => state.setInitialState);

  useEffect(() => {
    setInitialState();
  }, [user?.id]);

  return (
    <>
      <Header />
      <main className="min-h-screen px-2 pb-8 bg-gray-100 sm:px-4" role="main">
        {children}
      </main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
