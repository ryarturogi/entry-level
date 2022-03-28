import { Auth } from '@supabase/ui';

import Head from '@/components/partials/Head';
import { AuthRedirect } from '@/hooks/useAuthUser';
import Provider from '@/utils/initDatabase';

function AuthPage() {
  AuthRedirect();

  return (
    <>
      <Head title="Login" />

      <div className="authcontainer">
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
      </div>
    </>
  );
}

export default AuthPage;
