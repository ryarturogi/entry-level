import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

import Client from '@/utils/initDatabase';

export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserContextClient.');
  }

  return context;
};

const AuthUser = () => {
  const { user } = useUser();

  return user;
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
  await Client.auth.signOut();
};

export function UserContextProvider(props) {
  const [session, setSession] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    const currSession = Client.auth.session();

    setSession(currSession);
    setUser(currSession?.user ?? false);
    const { data: authListener } = Client.auth.onAuthStateChange(async (event, authSession) => {
      setSession(authSession);
      setUser(authSession?.user ?? false);
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    session,
    user,
  };

  return <UserContext.Provider value={value} {...props} />;
}

export default AuthUser;
