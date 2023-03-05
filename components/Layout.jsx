import Footer from '@/components/partials//Footer';
import Header from '@/components/partials/Header';
import useStore from '@/lib/store';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Layout = ({ children }) => {
  const setInitialState = useStore((state) => state.setInitialState);

  useEffect(() => {
    setInitialState();
  }, []);

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
