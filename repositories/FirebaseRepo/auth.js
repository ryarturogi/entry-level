import { auth, db, GithubAuthProvider, GoogleAuthProvider, signOut } from './FirebaseConfig';

const SavedJobsApi = () => {
  return db.collection('saved-jobs').orderBy('createdAt', 'desc');
};

/**
 * @title Get current user
 * @returns {Promise<Object>}
 * @memberof Firebase
 * @example
 * const user = Client.Auth.getCurrentUser()
 */
const getCurrentUser = () => {
  const { currentUser } = auth;

  return currentUser;
};

const getSavedJobsQuery = async (ref) => {
  const user = await getCurrentUser();
  const userId = user?.uid;
  const jobs = [];

  try {
    let snap = await ref.get({ source: 'cache' });

    if (!snap.exists) {
      snap = await ref.get({ source: 'server' });
    }
    if (snap.empty) {
      return [];
    }
    snap.forEach((doc) => {
      if (doc.data().userId === userId) {
        const job = { ...doc.data() };
        job.id = doc.id;
        jobs.push(job);
      }
    });
  } catch (err) {
    throw new Error(err.code);
  }

  return jobs;
};

/**
 *
 * @title Create new user
 * @returns {Promise<Object>}
 * @memberof Firebase
 * @example
 * const newUser = Client.Auth.signUp(userData)
 */
const signUp = async (email, password) => {
  await auth
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
      console.error(errorCode, errorMessage);
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
  await auth
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
      console.error(errorCode, errorMessage);
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
  let providerInstance = null;
  let errorMessage = null;

  switch (providerName) {
    case 'google':
      providerInstance = new GoogleAuthProvider();
      break;
    case 'github':
      providerInstance = new GithubAuthProvider();
      break;
    default:
      providerInstance = new GithubAuthProvider();
  }

  return auth.signInWithPopup(providerInstance).catch(async (err) => {
    if (err.code === 'auth/account-exists-with-different-credential') {
      const pendingCred = err.credential;
      const email = err.email;

      await auth
        .fetchSignInMethodsForEmail(email)
        .then(async (methods) => {
          const getForProviderId = (providerId) => {
            switch (providerId) {
              case 'google.com':
                return new GoogleAuthProvider();
              case 'github.com':
                return new GithubAuthProvider();
              default:
                return new GithubAuthProvider();
            }
          };

          const providerId = getForProviderId(methods[0]);
          await auth.signInWithPopup(providerId).then((result) => {
            result.user.linkWithCredential(pendingCred).then((usercred) => {
              return usercred;
            });
          });
        })
        .catch((error) => {
          errorMessage = error.message;
          // eslint-disable-next-line no-console
          console.error(errorMessage);
          return errorMessage;
        });
    }
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
    return await auth.session();
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    // eslint-disable-next-line no-console
    console.error(errorCode, errorMessage);

    return { error, errorCode, errorMessage };
  }
};

/**
 * @title Save job to saved jobs
 * @param {string} jobId
 * @returns {Promise<Object>}
 * @memberof Supabase
 * @example
 * const job = Client.saveJob('job')
 */
const saveJob = async (_, job) => {
  const user = await getCurrentUser();
  const userId = user?.uid;
  let jobData = null;

  if (userId) {
    jobData = {
      ...job,
      userId,
    };

    try {
      await db.collection('saved-jobs').doc(job.id).set(jobData);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      // eslint-disable-next-line no-console
      console.error(errorCode, errorMessage);

      return { error, errorCode, errorMessage };
    }
  }
  return jobData;
};

/**
 * @title Remove job from saved jobs
 * @param {string} jobId
 * @returns {Promise<Object>}
 * @memberof Supabase
 * @example
 * const job = Client.removeJob('jobId')
 */

const removeJob = async (_, { id }) => {
  const ref = await SavedJobsApi();

  getSavedJobsQuery(ref).then((jobs) => {
    const jobToRemove = jobs.find((job) => job.id === id);

    if (jobToRemove) {
      return db.collection('saved-jobs').doc(id).delete();
    }
  });
};

/**
 * @title Remove all jobs from saved jobs
 * @returns {Promise<Object>}
 * @memberof Supabase
 * @example
 * const job = Client.removeAllSavedJobs()
 */
const removeAllSavedJobs = async () => {
  try {
    await SavedJobsApi()
      .get()
      .toPromise()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });
  } catch (error) {
    throw new Error(error.code);
  }
};

/**
 * @title Get all jobs from saved jobs
 * @returns {Promise<Array>}
 * @memberof Supabase
 * @example
 * const jobs = Client.getSavedJobs()
 */
const getSavedJobs = async () => {
  const ref = await SavedJobsApi();
  try {
    return await getSavedJobsQuery(ref);
  } catch (error) {
    throw new Error(error.code);
  }
};

/**
 * @title Get saved jobs count
 * @returns {string}
 * @memberof Supabase
 * @example
 * const savedJobsCount = Client.Auth.savedJobsCount()
 */
const getSavedJobsCount = async () => {
  const ref = await SavedJobsApi();
  try {
    return (await getSavedJobsQuery(ref)?.length) || 0;
  } catch (error) {
    throw new Error(error.code);
  }
};

const Auth = () => ({
  auth,
  signUp,
  getCurrentSession,
  getCurrentUser,
  signIn,
  signInWithProvider,
  signOut: logout,
  saveJob,
  removeJob,
  removeAllSavedJobs,
  getSavedJobs,
  getSavedJobsCount,
});

export default Auth();
