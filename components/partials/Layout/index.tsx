import React from 'react';
import Header from '@/components/partials/Header';
import Footer from '@/components/partials/Footer';
import { useRouter } from 'next/router';
import { useUser } from '@supabase/auth-helpers-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps): React.ReactElement => {
  const { children } = props;
  const user = useUser();

  const userData = {
    id: user?.id,
    email: user?.email,
    name: user?.user_metadata?.full_name,
    role: user?.app_metadata?.role,
    avatar: user?.user_metadata?.avatar_url,
  };

  const router = useRouter();

  const excludedRoutes: string[] = ['/login', '/register'];
  const isExcludedRoute: boolean = excludedRoutes.includes(router.pathname);

  return (
    <article>
      <Header logo="/logo.svg" user={userData} />
      <main className="min-h-[calc(100vh-4rem)] px-2 pb-8 bg-gray-100 sm:px-4" role="main">
        {children}
      </main>
      {!isExcludedRoute && <Footer />}
    </article>
  );
};

export default Layout;
