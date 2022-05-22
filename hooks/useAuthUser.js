import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

import Provider from '@/utils/initDatabase';

const providerName = String(process.env.NEXT_PUBLIC_PROVIDER_NAME);
const currentProvider = Provider(providerName);

export const UserContext = createContext();

const AuthStateChanged = (setSession, setUser) => {
  if (providerName === 'supabase') {
    const currSession = currentProvider.Auth.getCurrentSession();
    const currentUser = currentProvider.Auth.getCurrentUser();

    setSession(currSession);
    setUser(currentUser ? currentUser : false);

    /*
     *  FIXME: Fix listener for auth state change
     * Const { authSession, authListener } = Provider(currentProvider).Auth.onAuthStateChange();
     */
    // Return console.log(currentProvider.Client);
    const { data: authListener } = currentProvider.Client.auth.onAuthStateChange(
      // eslint-disable-next-line no-shadow
      async (_event, session) => {
        setSession(session ?? false);
        setUser(session?.user ?? false);
      }
    );

    return { authListener };
  } else if (providerName === 'firebase') {
    const unsubscribe = currentProvider.Auth.auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
          setSession(idTokenResult.claims.auth_time * 1000 ?? false);
        });
        setUser(user ?? false);
      }
    });

    const authListener = {
      unsubscribe,
    };

    return { authListener };
  }

  return {};
};

export function AuthProvider(props) {
  const [session, setSession] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    const { authListener } = AuthStateChanged(setSession, setUser);

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
  await currentProvider.Auth.signOut();
};

const AuthUser = () => {
  const { user } = useUser();

  return user;
};

export default AuthUser;
