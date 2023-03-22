import React from 'react';
import Header from '@/components/partials/Header';
import Footer from '@/components/partials/Footer';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps): React.ReactElement => {
  const { children } = props;

  const router = useRouter();

  const excludedRoutes: string[] = ['/login', '/register'];
  const isExcludedRoute: boolean = excludedRoutes.includes(router.pathname);

  return (
    <article>
      <Header />
      <main className="min-h-[calc(100vh-4rem)] px-2 pb-8 bg-gray-100 sm:px-4" role="main">
        {children}
      </main>
      {!isExcludedRoute && <Footer />}
    </article>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
