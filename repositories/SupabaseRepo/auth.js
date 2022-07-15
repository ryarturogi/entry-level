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
      redirectTo: 'http://localhost:3000',
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
  return Client.auth.signOut();
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
    return Client.auth.currentUser;
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
    return Client.auth.session();
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

/**
 * @title Update current user
 * @returns {Promise<Object>}
 * @memberof Supabase
 * @example
 * const user = Client.Auth.getCurrentUser()
 */
const saveJob = async (jobs, job) => {
  try {
    if (jobs?.length > 0) {
      const { data, error } = Client.auth.update({
        data: { savedJobs: jobs.concat(job) },
      });

      return { error, data };
    } else {
      const { data, error } = await Client.auth.update({
        data: { savedJobs: [job] },
      });

      return { error, data };
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    // eslint-disable-next-line no-console
    console.log(errorCode, errorMessage);

    return { error, errorCode, errorMessage };
  }
};

/**
 * @title Remove Job from saved jobs
 * @returns {Promise<Object>}
 * @memberof Supabase
 * @example
 * const user = Client.Auth.removeJob(job)
 */

const removeJob = (jobs, job) => {
  try {
    const { data, error } = Client.auth.update({
      data: {
        savedJobs: jobs?.length > 0 ? jobs.filter((j) => j.id !== job.id) : [],
      },
    });

    return { error, data };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    // eslint-disable-next-line no-console
    console.log(errorCode, errorMessage);

    return { error, errorCode, errorMessage };
  }
};

/**
 * @title Get saved jobs
 * @returns {Promise<Object>}
 * @memberof Supabase
 * @example
 * const savedJobs = Client.Auth.getSavedJobs()
 */
const getSavedJobs = async () => {
  try {
    const savedJobs = Client.auth.currentSession?.user.user_metadata?.savedJobs;

    if (savedJobs?.length > 0) {
      return savedJobs;
    }
    return [];
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    // eslint-disable-next-line no-console
    console.log(errorCode, errorMessage);

    return { error, errorCode, errorMessage };
  }
};

/**
 * @title Remove all saved jobs
 * @returns {Promise<Object>}
 * @memberof Supabase
 * @example
 * const user = Client.Auth.removeAllJobs()
 */
const removeAllJobs = () => {
  try {
    const { user, error } = Client.auth.update({
      savedJobs: [],
    });

    return { error, user };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    // eslint-disable-next-line no-console
    console.log(errorCode, errorMessage);

    return { error, errorCode, errorMessage };
  }
};

/**
 * @title Get saved jobs count
 * @returns {string}
 * @memberof Supabase
 * @example
 * const savedJobsCount = Client.Auth.savedJobsCount()
 */
const getSavedJobsCount = () => {
  try {
    const savedJobs = Client.auth.currentSession?.user.user_metadata?.savedJobs;

    if (savedJobs?.length > 0) {
      return savedJobs.length;
    } else {
      return 0;
    }
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
  saveJob,
  removeJob,
  removeAllJobs,
  getSavedJobs,
  getSavedJobsCount,
});

export default Auth();
