import { useEffect, useState, createContext, useContext } from 'react';
import Provider from '@/utils/initDatabase';
import { useRouter } from 'next/router';

export const SignOut = async () => {
  await Provider.auth.signOut();
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

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [session, setSession] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    const session = Provider.auth.session();
    setSession(session);
    setUser(session?.user ?? false);
    const { data: authListener } = Provider.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? false);
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
  };
  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};

const AuthUser = () => {
  const { user } = useUser();
  return user;
};

export default AuthUser;
