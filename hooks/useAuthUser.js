import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

import Provider from '@/utils/initDatabase';

const currentProvider = String(process.env.NEXT_PUBLIC_PROVIDER_NAME);

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [session, setSession] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    const AuthProvider = Provider(currentProvider).Auth;
    const currSession = AuthProvider.getCurrentSession();
    const currentUser = AuthProvider.getCurrentUser();

    setSession(currSession);
    setUser(currentUser ? currentUser : false);
    // Const { authSession, authListener } = Provider(currentProvider).Auth.onAuthStateChange();
    const { data: authListener } = Provider(currentProvider).Client.auth.onAuthStateChange(
      // eslint-disable-next-line no-shadow
      (_event, session) => {
        setSession(session || false);
        setUser(currentUser ?? false);
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
