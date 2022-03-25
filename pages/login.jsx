import { AuthRedirect } from '@/hooks/useAuthUser'
import { provider } from '@/utils/initDatabase'
import { Auth } from '@supabase/ui'

import Header from '@/components/Header'

const AuthPage = () => {
  AuthRedirect()

  return (
    <>
      <Header pageTitle="Login" />

      <main className="authcontainer">
        <section className="space-y-5">
          <h1 className="text-3xl mb-3.5 font-bold text-gray-800">Welcome</h1>

          <div>
            <Auth
              supabaseClient={provider}
              providers={['google', 'github']}
              view={'sign_in'}
              socialLayout="horizontal"
              socialButtonSize="large"
            />
          </div>
        </section>
      </main>
    </>
  )
}

export default AuthPage
