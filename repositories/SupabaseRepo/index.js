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
    locations = [],
    skills = [],
    sortBy = 'newest',
    jobTypeOptions = [],
    experienceLevels = [],
  }) => {
    // Get cached filters if they exist, otherwise create new object
    const cachedFilters = localStorage.getItem('cachedFilters')
      ? JSON.parse(localStorage.getItem('cachedFilters'))
      : {};

    // Merge new filters with cached filters
    const filters = {
      jobType: jobType !== 'all' ? jobType : cachedFilters.jobType || 'all',
      locations: locations.length > 0 ? locations : cachedFilters.locations || [],
      skills: skills.length > 0 ? skills : cachedFilters.skills || [],
      sortBy: sortBy ? sortBy : cachedFilters.sortBy || 'newest',
      jobTypeOptions:
        jobTypeOptions.length > 0 ? jobTypeOptions : cachedFilters.jobTypeOptions || [],
      experienceLevels:
        experienceLevels.length > 0 ? experienceLevels : cachedFilters.experienceLevels || [],
    };

    // Store filters in local storage
    localStorage.setItem('cachedFilters', JSON.stringify(filters));

    let baseQuery = Client.from('jobs').select('*');

    if (filters.locations.length > 0) {
      const filteredLocations = filters.locations
        .filter(Boolean)
        .map((value) => String(value.toLowerCase()));
      baseQuery = baseQuery.in('location', filteredLocations);
    }

    if (filters.skills.length > 0) {
      const filteredSkills = filters.skills.filter(Boolean).map(String);
      const jobTagsQuery = filteredSkills.map((skill) => `jobTags.ilike.%${skill}%`).join(' or ');
      baseQuery = baseQuery.or(jobTagsQuery);
    }

    if (filters.experienceLevels.length > 0) {
      const filteredExperienceLevels = filters.experienceLevels
        .filter(Boolean)
        .map((value) => String(value.id));
      const experienceLevelsQuery = filteredExperienceLevels
        .map((level) => `experienceLevels.ilike.%${level}%`)
        .join(' or ');
      baseQuery = baseQuery.or(experienceLevelsQuery);
    }

    if (filters.jobTypeOptions.length > 0) {
      const filteredExperienceLevels = filters.jobTypeOptions
        .filter(Boolean)
        .map((value) => String(value.id));
      const jobTypeOptionsQuery = filteredExperienceLevels
        .map((type) => `jobTypesOptions.ilike.%${type}%`)
        .join(' or ');
      baseQuery = baseQuery.or(jobTypeOptionsQuery);
    }

    if (filters.jobType !== 'all') {
      baseQuery = baseQuery.eq('jobType', filters.jobType);
    }

    try {
      const sortedBy = filters.sortBy !== 'newest';
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
