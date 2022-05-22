import { slugify } from '@/utils/slugify';

import Auth from './auth';
import { db, fieldValue, storage } from './FirebaseConfig';

// Jobs
/**
 * @title Get all jobs
 * @returns {Promise<Array>}
 * @memberof Firebase
 * @example
 * const jobs = Client.getJobs()
 *
 */
const getJobs = async () => {
  const ref = db.collection('jobs').orderBy('createdAt', 'desc');

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
      const job = { ...doc.data() };

      job.id = doc.id;
      jobs.push(job);
    });
  } catch (err) {
    throw new Error(err.code);
  }

  return jobs;
};

/**
 * @title Get job by id
 * @param {string} jobId
 * @returns {Promise<Object>}
 * @memberof Firebase
 * @example
 * const job = Client.getJob(jobId)
 *
 */
const getJob = async (jobId) => {
  const ref = db.doc(`jobs/${jobId}`);
  let job = {};

  try {
    const snap = await ref.get();

    job = { ...snap.data() };
    job.id = snap.id;
  } catch (err) {
    throw new Error(err.code);
  }

  return job;
};

/**
 * @title Upload company logo
 * @param {object} job
 * @returns {Promise<Object>}
 * @memberof Firebase
 * @example
 * const job = Client.uploadLogo(jobId, companyLogo)
 *
 */
const uploadLogo = (jobId, companyLogo) => {
  const ref = db.collection('jobs').doc(jobId);

  try {
    ref.update({
      companyLogo,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * @title Create job
 * @param {string} slug
 * @returns {Promise<Object>}
 * @memberof Firebase
 * @example
 * const job = Client.createJob(userId, job)
 *
 */
const createJob = async (userId, job) => {
  const data = {
    job,
    userId,
  };
  const ref = db.collection('jobs').doc();

  let doc = {};

  try {
    data.createdAt = fieldValue.serverTimestamp(new Date().now);
    doc = await ref.get();
    data.job.id = doc.id;
    await ref.set(data.job);

    if (data.job.hasCompanyLogo) {
      // Set companyLogo, upload and get url.
      const companyLogoPath = `/company/${slugify(data.job.companyName)}/${
        data.job.companyLogo.name
      }`;
      const storageRef = storage.ref(companyLogoPath);

      await storageRef.put(data.companyLogo);
      await storageRef.getDownloadURL().then((url) => uploadLogo(data.job.id, url));
    }
  } catch (err) {
    throw new Error(err.message);
  }
  const newJob = { ...doc.data() };

  newJob.id = doc.id;

  return newJob;
};

/**
 * @title Update job
 * @param {string} jobId
 * @param {string} slug
 * @returns {Promise<Object>}
 * @memberof Firebase
 * @example
 * const newJob = Client.updateJob(userId, job)
 *
 */
const updateJob = async (userId, job) => {
  const ref = db.collection('jobs').doc(job.id);

  let doc = {};

  try {
    await ref.set(job);
    doc = await ref.get();
  } catch (err) {
    throw new Error(err.code);
  }
  const newJob = { ...doc.data() };

  newJob.id = doc.id;

  return newJob;
};

/**
 * @title Remove job
 * @param {string} jobId
 * @returns {Promise<Object>}
 * @memberof Firebase
 * @example
 * const removedJob = Client.removeJob(userId, job)
 *
 */
const removeJob = async (userId, job) => {
  const ref = db.collection('jobs').doc(job.id);

  try {
    await ref.delete();
  } catch (err) {
    throw new Error(err.code);
  }
};

// Companies
/**
 * @title Get all companies
 * @returns {Promise<Array>}
 * @memberof Firebase
 * @example
 * const companies = Client.getCompanies()
 *
 */
const getCompanies = async () => {
  const ref = db.collection('companies').orderBy('createdAt', 'desc');

  const companies = [];

  try {
    let snap = await ref.get({ source: 'cache' });

    if (!snap.exists) {
      snap = await ref.get({ source: 'server' });
    }
    if (snap.empty) {
      return [];
    }
    snap.forEach((doc) => {
      const company = { ...doc.data() };

      company.id = doc.id;
      companies.push(company);
    });
  } catch (err) {
    throw new Error(err.code);
  }

  return companies;
};

/**
 * @title Get company by id
 * @param {string} companyId
 * @returns {Promise<Object>}
 * @memberof Firebase
 * @example
 * const company = Client.getCompany('companyId')
 *
 */
const getCompany = async (companyId) => {
  const ref = db.doc(`companies/${companyId}`);
  let company = {};

  try {
    const snap = await ref.get();

    company = { ...snap.data() };
    company.id = snap.id;
  } catch (err) {
    throw new Error(err.code);
  }

  return company;
};

// Categories
/**
 * @title Get all categories
 * @returns {Promise<Array>}
 * @memberof Firebase
 * @example
 * const categories = Client.getCategories()
 *
 */
const getCategories = async () => {
  const ref = db.collection('categories').orderBy('createdAt', 'desc');

  const categories = [];

  try {
    let snap = await ref.get({ source: 'cache' });

    if (!snap.exists) {
      snap = await ref.get({ source: 'server' });
    }
    if (snap.empty) {
      return [];
    }
    snap.forEach((doc) => {
      const category = { ...doc.data() };

      category.id = doc.id;
      categories.push(category);
    });
  } catch (err) {
    throw new Error(err.code);
  }

  return categories;
};

/**
 * @title Get category by id
 * @param {string} categoryId
 * @returns {Promise<Object>}
 * @memberof Firebase
 * @example
 * const category = Client.getCategory('categoryId')
 *
 */
const getCategory = async (categoryId) => {
  const ref = db.doc(`categories/${categoryId}`);
  let category = {};

  try {
    const snap = await ref.get();

    category = { ...snap.data() };
    category.id = snap.id;
  } catch (err) {
    throw new Error(err.code);
  }

  return category;
};

/**
 * @title Create category
 * @param {object} category
 * @returns {Promise<Object>}
 * @memberof Firebase
 * @example
 * const category = Client.createCategory(category)
 *
 */
const createCategory = async (category) => {
  const data = {
    category,
  };
  const ref = db.collection('categories').doc();

  let doc = {};

  try {
    data.createdAt = fieldValue.serverTimestamp(new Date().now);
    doc = await ref.get();
    data.category.id = doc.id;
    await ref.set(data.category);
  } catch (err) {
    throw new Error(err.message);
  }
  const newCategory = { ...doc.data() };

  newCategory.id = doc.id;

  return newCategory;
};

/**
 * @title Update category
 * @param {string} categoryId
 * @param {object} category
 * @returns {Promise<Object>}
 * @memberof Firebase
 * @example
 * const newCategory = Client.updateCategory(categoryId, category)
 *
 */
const updateCategory = async (categoryId, category) => {
  const ref = db.collection('categories').doc(categoryId);

  let doc = {};

  try {
    await ref.set(category);
    doc = await ref.get();
  } catch (err) {
    throw new Error(err.code);
  }
  const updatedCategory = { ...doc.data() };

  updatedCategory.id = doc.id;

  return updatedCategory;
};

/**
 * @title Delete category
 * @param {string} categoryId
 * @returns {Promise<Object>}
 * @memberof Firebase
 * @example
 * const removedCategory = Client.removeCategory(categoryId)
 *
 */
const removeCategory = async (categoryId) => {
  const ref = db.collection('categories').doc(categoryId);

  try {
    await ref.delete();
  } catch (err) {
    throw new Error(err.code);
  }
};

const Firebase = () => ({
  Auth,
  createCategory,
  createJob,
  getCategories,
  getCategory,
  getCompanies,
  getCompany,
  getJob,
  getJobs,
  removeCategory,
  removeJob,
  updateCategory,
  updateJob,
});

export default Firebase;
