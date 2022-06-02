import Client from './SupabaseConfig';

/**
 *
 * @title Create new user
 * @returns {Promise<Object>}
 * @memberof Supabase
 * @example
 * const newUser = Client.Auth.createUser(userData)
 */
const createUser = async (email, password) => {
  try {
    const { user, session, error } = await Client.auth.signUp({
      email,
      password,
    });

    return { error, session, user };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    // eslint-disable-next-line no-console
    console.log(errorCode, errorMessage);

    return { error, errorCode, errorMessage };
  }
};

/**
 * @title Sign in user
 * @returns {Promise<Object>}
 * @memberof Supabase
 * @example
 * const user = Client.Auth.signIn(email, password)
 */
const signIn = async (email, password) => {
  try {
    const { user, session, error } = await Client.auth.signIn({
      email,
      password,
    });

    return { error, session, user };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    // eslint-disable-next-line no-console
    console.log(errorCode, errorMessage);

    return { error, errorCode, errorMessage };
  }
};

/**
 * @title Sign in user with GitHub
 * @returns {Promise<Object>}
 * @memberof Supabase
 * @example
 * const user = Client.Auth.signInWithGithub()
 */
const signInWithProvider = async (providerName) => {
  try {
    const { user, session, error } = await Client.auth.signIn({
      provider: providerName || 'google',
    });

    return { error, session, user };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    // eslint-disable-next-line no-console
    console.log(errorCode, errorMessage);

    return { error, errorCode, errorMessage };
  }
};

/**
 * @title Sign Out user
 * @returns {Promise<Object>}
 * @memberof Supabase
 * @example
 * const logOutUser = Client.Auth.signOut();
 */

const signOut = async () => {
  const signedOut = Client.auth.signOut();

  return signedOut;
};

/**
 * @title Get current user
 * @returns {Promise<Object>}
 * @memberof Supabase
 * @example
 * const user = Client.Auth.getCurrentUser()
 */
const getCurrentUser = () => {
  try {
    const user = Client.auth.user();

    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    // eslint-disable-next-line no-console
    console.log(errorCode, errorMessage);

    return { error, errorCode, errorMessage };
  }
};

/**
 * @title Get current session
 * @returns {Promise<Object>}
 * @memberof Supabase
 * @example
 * const authState = Client.Auth.getCurrentSession()
 */
const getCurrentSession = () => {
  try {
    const session = Client.auth.session();

    return session;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    // eslint-disable-next-line no-console
    console.log(errorCode, errorMessage);

    return { error, errorCode, errorMessage };
  }
};

/**
 * @title On Auth state change
 * @returns {Promise<Object>}
 * @memberof Supabase
 * @example
 * const authState = Client.Auth.onAuthStateChange()
 */
const onAuthStateChange = () => {
  try {
    let authSession = null;
    let authUser = null;

    let authState = Client.auth.onAuthStateChange(async (_event, session) => {
      authSession = session || null;
      authUser = session?.user || null;
    });

    authState = { ...authState, authSession, authUser };

    return authState;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    // eslint-disable-next-line no-console
    console.log(errorCode, errorMessage);

    return { error, errorCode, errorMessage };
  }
};

const Auth = () => ({
  authMethods: Client.auth,
  createUser,
  getCurrentSession,
  getCurrentUser,
  onAuthStateChange,
  signIn,
  signInWithProvider,
  signOut,
});

export default Auth();
