import Client from './SupabaseConfig';

/**
 *
 * @title Create new user
 * @returns {Promise<Object>}
 * @memberof Supabase
 * @example
 * const newUser = Client.Auth.signUp(userData)
 */
const signUp = async ({ email, password, data }) => {
  try {
    const { user, error } = await Client.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'http://localhost:3000',
        data,
      },
    });

    return { error, user };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    // eslint-disable-next-line no-console
    console.error(errorCode, errorMessage);

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
    const {
      data: { user },
      session,
      error,
    } = await Client.auth.signInWithPassword({
      email,
      password,
    });

    return { error, session, user };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    // eslint-disable-next-line no-console
    console.error(errorCode, errorMessage);

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
    const { data: user, error } = await Client.auth.signInWithOAuth({
      provider: providerName || 'google',
    });

    return { error, user };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    // eslint-disable-next-line no-console
    console.error(errorCode, errorMessage);

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
  return await Client.auth.signOut();
};

/**
 * @title Get current user
 * @returns {Promise<Object>}
 * @memberof Supabase
 * @example
 * const user = Client.Auth.getCurrentUser()
 */
const getCurrentUser = async () => {
  try {
    const {
      data: { user },
    } = await Client.auth.getUser();

    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    // eslint-disable-next-line no-console
    console.error(errorCode, errorMessage);

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
const getCurrentSession = async () => {
  try {
    const {
      data: { session },
    } = await Client.auth.getSession();

    return session;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    // eslint-disable-next-line no-console
    console.error(errorCode, errorMessage);

    return { error, errorCode, errorMessage };
  }
};

/**
 * @title Update user metadata
 * @returns {Promise<Object>}
 * @memberof Supabase
 * @example
 * const user = Client.Auth.updateUserMetadata(userMetadata)
 * @param {Object} userMetadata
 */
const updateUserMetadata = async (userMetadata) => {
  try {
    const { data, error } = await Client.auth.updateUser({
      data: userMetadata,
    });

    return { error, data };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    // eslint-disable-next-line no-console
    console.error(errorCode, errorMessage);

    return { error, errorCode, errorMessage };
  }
};

const onAuthStateChange = (callback) => {
  return Client.auth.onAuthStateChange(callback);
};

const Auth = () => ({
  authMethods: Client.auth,
  signUp,
  getCurrentSession,
  getCurrentUser,
  signIn,
  signInWithProvider,
  signOut,
  updateUserMetadata,
  onAuthStateChange,
});

export default Auth();
