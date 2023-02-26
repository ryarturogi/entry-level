import { BookmarkIcon } from '@heroicons/react/24/solid';

import Head from '@/components/partials/Head';
import Button from '@/components/UI/Button';
import { AuthRedirect } from '@/hooks/useAuthUser';
import Provider from '@/utils/initDatabase';

const currentProvider = String(process.env.NEXT_PUBLIC_PROVIDER_NAME);

const Login = () => {
  AuthRedirect();

  const { Auth } = Provider(currentProvider);

  const login = async (provider) => Auth.signInWithProvider(provider);

  return (
    <>
      <Head title="Login" />

      <div className="relative flex items-center justify-center h-full max-w-sm p-5 m-auto bg-gray-100 min-h-250px top-40 rounded-xl">
        <div className="flex flex-col items-center w-full space-y-5 ">
          <section className="space-y-2.5 w-full">
            <h1 className="flex justify-center w-full text-2xl font-bold text-left text-gray-800">
              Sign in with
            </h1>
            <nav className="space-y-3 text-base text-gray-400 list-none">
              <li>
                <Button
                  color="success"
                  icon={<BookmarkIcon />}
                  iconSize="md"
                  onClick={() => login('google')}
                  size="md"
                  styles="bg-DB4437 hover:bg-cb3e32 focus:bg-DB4437"
                >
                  Login with Google
                </Button>
              </li>
              <li>
                <Button
                  color="success"
                  icon={<BookmarkIcon />}
                  iconSize="md"
                  onClick={() => login('github')}
                  size="md"
                  styles="bg-333 hover:bg-282727 focus:bg-333"
                >
                  Login with Github
                </Button>
              </li>
            </nav>
          </section>
          {/* <div className="flex justify-center w-full text-sm font-medium text-left text-gray-500 ">
            <span>or continue with</span>
          </div>
          <section className="space-y-1.5 w-full">
            <form className="space-y-3">
              <div className="flex flex-col items-start space-y-1">
                <label className="text-sm font-medium text-gray-500" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full px-3 py-3 border border-gray-300 rounded"
                  id="email"
                  type="email"
                />
              </div>
              <div className="flex flex-col items-start space-y-1">
                <label className="text-sm font-medium text-gray-500" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-full px-3 py-3 border border-gray-300 rounded"
                  id="password"
                  type="password"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <Button
                  color="primary"
                  displayType="inline"
                  icon={<LoginIcon />}
                  rounded="md"
                  size="md"
                  type="submit"
                >
                  Sign in
                </Button>
              </div>
            </form>
          </section> */}
        </div>
      </div>
    </>
  );
};

export default Login;
