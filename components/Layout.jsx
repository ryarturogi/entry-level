import Header from '@/components/partials/Header';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen px-2 pb-8 bg-gray-100 sm:px-4" role="main">
        {children}
      </main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
