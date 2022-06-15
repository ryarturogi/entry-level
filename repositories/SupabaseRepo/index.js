import { slugify } from '@/utils/slugify';

import Auth from './auth';
import Client from './SupabaseConfig';

const Supabase = () => {
  // Jobs
  /**
   * @title Get Jobs API
   * @returns {Promise<Array>}
   * @memberof Supabase
   * @example
   * const jobs = Client.getJobsApi()
   *
   */
  const getJobsApi = () => {
    return Client.from('jobs').select('*').order('createdAt', { ascending: false });
  };

  /**
   * @title Get Jobs API
   * @returns {Promise<Array>}
   * @memberof Supabase
   * @example
   * const jobs = Client.getJobs()
   *
   */
  const getJobs = async () => {
    const { data: Jobs } = await getJobsApi();

    return Jobs;
  };

  /**
   * @title Get Jobs by Type
   * @returns {Promise<Array>}
   * @memberof Supabase
   * @example
   * const jobs = Client.getJobsByType()
   *
   */
  const getJobsByType = async (type) => {
    const { data: JobsByType } = await getJobsApi().eq('jobType', type);

    return JobsByType;
  };

  /**
   * @title Get Jobs by Category
   * @returns {Promise<Array>}
   * @memberof Supabase
   * @example
   * const jobs = Client.getJobsByCategory()
   *
   */
  const getJobsByCategory = async (category) => {
    const { data: JobsByCategory } = await getJobsApi().eq('jobCategory', category);

    return JobsByCategory;
  };

  /**
   * @title Get Jobs by Location
   * @returns {Promise<Array>}
   * @memberof Supabase
   * @example
   * const jobs = Client.getJobsByLocation()
   *
   */
  const getJobsByLocation = async (location) => {
    const { data: JobsByLocation } = await getJobsApi().eq('location', location);

    return JobsByLocation;
  };

  /**
   * @title Get Jobs by Tags
   * @returns {Promise<Array>}
   * @memberof Supabase
   * @example
   * const jobs = Client.getJobsByTag()
   *
   */
  const getJobsByTag = async (tag) => {
    const { data: JobsByTag } = await getJobsApi().textSearch('jobTags', tag, {
      config: 'english',
    });
    return JobsByTag;
  };

  /**
   * @title Search jobs by keyword
   * @param {string} keyword
   * @returns {Promise<Array>}
   * @memberof Supabase
   * @example
   * const jobs = Client.searchJobs('developer')
   **/
  const searchJobs = async (searchValue) => {
    const { data: jobs } = await Client.from('jobs').select('*');
    return jobs.filter((job) => {
      const isValid = (str) => {
        return str.toLowerCase().includes(searchValue.toLowerCase());
      };

      const isSearchQueryValid =
        isValid(job.jobTitle) ||
        isValid(job.jobType) ||
        isValid(job.jobCategory) ||
        isValid(job.companyName) ||
        isValid(job.location);

      if (!isSearchQueryValid) {
        return;
      }

      return job;
    });
  };

  /**
   * @title Get job by id
   * @param {string} jobId
   * @returns {Promise<Object>}
   * @memberof Supabase
   * @example
   * const job = Client.getJob('jobId')
   *
   */
  const getJob = async (jobId) => {
    const { data: Job } = await Client.from('jobs').select('*').eq('id', jobId);

    return Job[0];
  };

  /**
   * @title Create job
   * @param {string} slug
   * @returns {Promise<Object>}
   * @memberof Supabase
   * @example
   * const job = Client.createJob('jobSlug')
   *
   */
  const createJob = async (job) => {
    const { data: Job } = await Client.from('messages').upsert(job);

    return Job;
  };

  /**
   * @title Update job
   * @param {string} jobId
   * @param {string} slug
   * @returns {Promise<Object>}
   * @memberof Supabase
   * @example
   * const newJob = Client.updateJob(jobId, job)
   *
   */
  const updateJob = async (jobId, job) => {
    const { data: Job } = await Client.from('jobs').update(job).match({ id: jobId });

    return Job;
  };

  /**
   * @title Delete job
   * @param {string} jobId
   * @returns {Promise<Object>}
   * @memberof Supabase
   * @example
   * const removedJob = Client.removeJob('jobId')
   *
   */
  const removeJob = async (jobId) => {
    const { data: Job } = await Client.from('jobs').delete().match({ id: jobId });

    return Job;
  };

  /**
   * @title Upload job logo
   * @param {object} job
   * @returns {Promise<Object>}
   * @memberof Supabase
   * @example
   * const job = Client.uploadLogo(company, file)
   *
   */
  const uploadLogo = async (company, file) => {
    const { data, error } = await Client.storage
      .from('company-logos')
      .upload(`public/img/logos/${slugify(company)}.png`, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  // Companies
  /**
   * @title Get all companies
   * @returns {Promise<Array>}
   * @memberof Supabase
   * @example
   * const companies = Client.getCompanies()
   *
   */
  const getCompanies = async () => {
    const { data: Companies } = await Client.from('jobs').select(`id,
    userId,
    companyLogo,
    companyName,
    companyDescription,
    companyWebsite,
    companySlug,
    createdAt`);

    return Companies;
  };

  /**
   * @title Get company by id
   * @param {string} companyId
   * @returns {Promise<Object>}
   * @memberof Supabase
   * @example
   * const company = Client.getCompany('companyId')
   *
   */
  const getCompany = async (companyId) => {
    const { data: Company } = await Client.from('jobs')
      .select(
        `id,
        userId,
        companyLogo,
        companyName,
        companyDescription,
        companyWebsite,
        companySlug,
        createdAt`
      )
      .eq('id', companyId);

    return Company;
  };

  // Categories
  /**
   * @title Get all categories
   * @returns {Promise<Array>}
   * @memberof Supabase
   * @example
   * const categories = Client.getCategories()
   *
   */
  const getCategories = async () => {
    const { data: Categories } = await Client.from('Categories').select('*');

    return Categories;
  };

  /**
   * @title Get category by id
   * @param {string} categoryId
   * @returns {Promise<Object>}
   * @memberof Supabase
   * @example
   * const category = Client.getCategory('categoryId')
   *
   */
  const getCategory = async (categoryId) => {
    const { data: Category } = await Client.from('Categories').select('*').eq('id', categoryId);

    return Category;
  };

  /**
   * @title Create category
   * @param {object} category
   * @returns {Promise<Object>}
   * @memberof Supabase
   * @example
   * const category = Client.createCategory(category)
   *
   */
  const createCategory = async (category) => {
    const { data: Category } = await Client.from('Categories').upsert(category);

    return Category;
  };

  /**
   * @title Update category
   * @param {string} categoryId
   * @param {object} category
   * @returns {Promise<Object>}
   * @memberof Supabase
   * @example
   * const newCategory = Client.updateCategory(categoryId, category)
   *
   */
  const updateCategory = async (categoryId, category) => {
    const { data: Category } = await Client.from('Categories')
      .update(category)
      .match({ id: categoryId });

    return Category;
  };

  /**
   * @title Delete category
   * @param {string} categoryId
   * @returns {Promise<Object>}
   * @memberof Supabase
   * @example
   * const removedCategory = Client.removeCategory(categoryId)
   *
   */
  const removeCategory = async (categoryId) => {
    const { data: Category } = await Client.from('Categories').delete().match({ id: categoryId });

    return Category;
  };

  return {
    Auth,
    Client,
    createCategory,
    createJob,
    getCategories,
    getCategory,
    getCompanies,
    getCompany,
    getJob,
    getJobs,
    getJobsByType,
    getJobsByCategory,
    getJobsByLocation,
    getJobsByTag,
    searchJobs,
    removeCategory,
    removeJob,
    updateCategory,
    updateJob,
    uploadLogo,
  };
};

export default Supabase;
