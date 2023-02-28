import { decode } from 'base64-arraybuffer';

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
   * const jobs = Client.getJobs(contentType, content)
   *
   */
  const getJobs = async (contentType, content) => {
    const jobsApi = getJobsApi();

    switch (true) {
      case contentType === 'jobType':
        jobsApi.eq('jobType', content);
        break;
      case contentType === 'jobCategory':
        jobsApi.eq('jobCategory', content);
        break;
      case contentType === 'location':
        jobsApi.eq('location', content);
        break;
      case contentType === 'companySlug':
        jobsApi.eq('companySlug', content);
        break;
      case contentType === 'jobTags':
        jobsApi.textSearch('jobTags', content, {
          config: 'english',
        });
        break;
      default:
        break;
    }

    const { data: Jobs } = await jobsApi.order('createdAt', { ascending: false });

    return Jobs;
  };

  /**
   * @title Get Filtered Jobs
   * @returns {Promise<Array>}
   * @memberof Supabase
   * @example
   * const jobs = Client.getFilteredJobs
   **/
  const getFilteredJobs = async ({
    jobType = 'all',
    categories = [],
    locations = [],
    skills = [],
    sortBy = 'newest',
    jobTypeOptions = [],
    experienceLevels = [],
  }) => {
    let baseQuery = Client.from('jobs').select('*');

    if (categories.length > 0) {
      baseQuery = baseQuery.in(
        'jobCategory',
        categories.map((category) => category.toLowerCase())
      );
    }

    if (skills.length > 0) {
      const skillsQuery = skills.map((skill) => `jobTags.ilike.%${skill}%`);
      baseQuery = baseQuery.or(skillsQuery);
    }

    if (locations.length > 0) {
      baseQuery = baseQuery.in(
        'location',
        locations.map((location) => location.toLowerCase())
      );
    }

    if (jobType !== 'all') {
      baseQuery = baseQuery.eq('jobType', jobType);
    }

    if (jobTypeOptions.length > 0) {
      const jobTypeOptionsQuery = jobTypeOptions.map(
        (jobTypeOption) => `jobTypesOptions.ilike.%${jobTypeOption.id}%`
      );
      baseQuery = baseQuery.or(jobTypeOptionsQuery);
    }
    if (experienceLevels.length > 0) {
      const levels = experienceLevels.map((level) => level.id);
      baseQuery = baseQuery.in('experienceLevels', levels);
    }

    try {
      const sortedBy = sortBy !== 'newest';
      const { data: Jobs } = await baseQuery.order('createdAt', {
        ascending: sortedBy,
      });
      return Jobs;
    } catch (error) {
      console.error(error);
      return [];
    }
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
  const uploadLogo = async (slug, file) => {
    const slugify = (str) => {
      return str
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-');
    };

    const { data, error } = await Client.storage
      .from(`${slug}-images`)
      .upload(`public/img/${slugify(slug)}.png`, decode(file), {
        contentType: 'image/png',
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
    getFilteredJobs,
    searchJobs,
    removeCategory,
    removeJob,
    updateCategory,
    updateJob,
    uploadLogo,
  };
};

export default Supabase;
