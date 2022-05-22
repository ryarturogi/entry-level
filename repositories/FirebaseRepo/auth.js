import { auth, GithubAuthProvider, GoogleAuthProvider, signOut } from './FirebaseConfig';

/**
 *
 * @title Create new user
 * @returns {Promise<Object>}
 * @memberof Firebase
 * @example
 * const newUser = Client.Auth.createUser(userData)
 */
const createUser = async (email, password) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const { user } = userCredential;

      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      // eslint-disable-next-line no-console
      console.log(errorCode, errorMessage);
    });
};

/**
 * @title Sign in user
 * @returns {Promise<Object>}
 * @memberof Firebase
 * @example
 * const user = Client.Auth.signIn(email, password)
 */
const signIn = async (email, password) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const { user } = userCredential;

      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      // eslint-disable-next-line no-console
      console.log(errorCode, errorMessage);
    });
};

/**
 * @title Sign in user with GitHub
 * @returns {Promise<Object>}
 * @memberof Firebase
 * @example
 * const user = Client.Auth.signInWithProvider()
 */
const signInWithProvider = async (providerName) => {
  let provider = null;

  switch (providerName) {
    case 'google':
      provider = new GoogleAuthProvider();
      break;
    case 'github':
      provider = new GithubAuthProvider();
      break;
    default:
      provider = new GithubAuthProvider();
  }

  auth
    .signInWithPopup(provider)
    .then((userCredential) => {
      // Signed in
      const { user } = userCredential;

      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      // eslint-disable-next-line no-console
      console.log(errorCode, errorMessage);
    });
};

/**
 * @title Sign Out user
 * @returns {Promise<Object>}
 * @memberof Firebase
 * @example
 * const logOutUser = Client.Auth.signOut();
 */

const logout = async () => {
  try {
    return await signOut();
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    // eslint-disable-next-line no-console
    console.log(errorCode, errorMessage);

    return { error, errorCode, errorMessage };
  }
};

/**
 * @title Get current user
 * @returns {Promise<Object>}
 * @memberof Firebase
 * @example
 * const user = Client.Auth.getCurrentUser()
 */
const getCurrentUser = async () => {
  const { currentUser } = auth;

  return currentUser;
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
    const session = auth.session();

    return session;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    // eslint-disable-next-line no-console
    console.log(errorCode, errorMessage);

    return { error, errorCode, errorMessage };
  }
};

const Auth = () => ({
  auth,
  createUser,
  getCurrentSession,
  getCurrentUser,
  signIn,
  signInWithProvider,
  signOut: logout,
});

export default Auth();
