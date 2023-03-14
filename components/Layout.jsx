import Footer from '@/components/partials//Footer';
import Header from '@/components/partials/Header';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();

  const footerExcludedRoutes = ['/login', '/register'];

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-4rem)] px-2 pb-8 bg-gray-100 sm:px-4" role="main">
        {children}
      </main>
      {!footerExcludedRoutes.includes(router.pathname) && <Footer />}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
