import { auth } from './FirebaseConfig';

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
 * @title Sign Out user
 * @returns {Promise<Object>}
 * @memberof Firebase
 * @example
 * const logOutUser = Client.Auth.signOut();
 */

const signOut = async () => {
  try {
    return await auth.signOut();
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

/**
 * @title On Auth state change
 * @returns {Promise<Object>}
 * @memberof Firebase
 * @example
 * const authState = Client.Auth.onAuthStateChange()
 */
const onAuthStateChange = () => {
  try {
    let authSession = null;
    let authListener = null;

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user === null) {
        authSession = null;
      } else {
        user.getIdTokenResult().then((idTokenResult) => {
          const sessionTime = idTokenResult.claims.auth_time * 1000;

          authSession = {
            sessionTime,
            user,
          };
        });
      }
    });

    authListener = {
      unsubscribe,
    };

    console.log(authListener, authSession);

    return { authListener, authSession };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    // eslint-disable-next-line no-console
    console.log(errorCode, errorMessage);

    return { error, errorCode, errorMessage };
  }
};

const Auth = () => ({
  createUser,
  getCurrentSession,
  getCurrentUser,
  onAuthStateChange,
  signIn,
  signOut,
});

export default Auth();
