import { Auth } from '@supabase/ui';

import Header from '@/components/Header';
import { AuthRedirect } from '@/hooks/useAuthUser';
import Provider from '@/utils/initDatabase';

function AuthPage() {
  AuthRedirect();

  return (
    <>
      <Header pageTitle="Login" />

      <main className="authcontainer">
        <section className="space-y-5">
          <h1 className="text-3xl mb-3.5 font-bold text-gray-800">Welcome</h1>

          <div>
            <Auth
              providers={['google', 'github']}
              socialButtonSize="large"
              socialLayout="horizontal"
              supabaseClient={Provider}
              view="sign_in"
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default AuthPage;
