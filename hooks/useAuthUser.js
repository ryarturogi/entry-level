import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

import Provider from '@/utils/initDatabase';

const currentProvider = String(process.env.NEXT_PUBLIC_PROVIDER_NAME);

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [session, setSession] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    const currProvider = Provider(currentProvider);
    const currSession = currProvider.Auth.getCurrentSession();
    const currentUser = currProvider.Auth.getCurrentUser();

    setSession(currSession);
    setUser(currentUser ? currentUser : false);

    /*
     *  FIXME: Fix listener for auth state change
     * Const { authSession, authListener } = Provider(currentProvider).Auth.onAuthStateChange();
     */

    const { data: authListener } = currProvider.Client.auth.onAuthStateChange(
      // eslint-disable-next-line no-shadow
      async (_event, session) => {
        setSession(session ?? false);
        setUser(session?.user ?? false);
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, [user, session]);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    session,
    user,
  };

  return <UserContext.Provider value={value} {...props} />;
}

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserContextClient.');
  }

  return context;
};

export const RequireAuth = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);
};

export const AuthRedirect = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/profile');
    }
  }, [user, router]);
};

export const SignOut = async () => {
  await Provider(currentProvider).Auth.signOut();
};

const AuthUser = () => {
  const { user } = useUser();

  return user;
};

export default AuthUser;
