import Auth from './auth';
import Client from './SupabaseConfig';

const Supabase = () => {
  /**
   * @title Get Jobs Api
   * @returns {Promise<Array>}
   * @memberof Supabase
   * @example
   * const jobs = Client.getJobsApi()
   *
   */
  const getJobsApi = () => {
    return Client.from('jobs').select('*', { count: 'exact' });
  };

  /**
   * @title Get Jobs by content type
   * @returns {Promise<Array>}
   * @memberof Supabase
   * @example
   * const jobs = Client.getJobs(contentType, content)
   *
   */
  const getJobs = async ({ contentType, query, limit = 5, offset = 0 }) => {
    const jobsApi = getJobsApi();

    switch (true) {
      case contentType === 'jobType':
        jobsApi.eq('jobType', query);
        break;
      case contentType === 'jobCategory':
        jobsApi.eq('jobCategory', query);
        break;
      case contentType === 'location':
        jobsApi.eq('location', query);
        break;
      case contentType === 'companySlug':
        jobsApi.eq('companySlug', query);
        break;
      case contentType === 'jobTags':
        jobsApi.contains('jobTags', [query], { all: true });
        break;
    }

    const { data, count, error } = await jobsApi
      .order('createdAt', { ascending: false })
      .range(offset, offset + Number(limit - 1));

    return { data, count, error };
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
    limit = 5,
    offset = 0,
  }) => {
    let baseQuery = Client.from('jobs').select('*', { count: 'exact' });

    if (categories.length > 0) {
      baseQuery = baseQuery.in(
        'jobCategory',
        categories.map((category) => category.toLowerCase())
      );
    }

    if (skills.length > 0) {
      baseQuery = baseQuery.contains('jobTags', skills, { all: true });
    }

    if (locations.length > 0) {
      baseQuery = baseQuery.in(
        'location',
        locations.map((location) => location.toLowerCase())
      );
    }

    if (jobType !== 'all') {
      baseQuery = baseQuery.eq('jobLocationType', jobType);
    }

    if (jobTypeOptions.length > 0) {
      const jobTypeOptionsQuery = jobTypeOptions.map(
        (jobTypeOption) => `jobType.ilike.%${jobTypeOption.id}%`
      );
      baseQuery = baseQuery.or(jobTypeOptionsQuery);
    }

    if (experienceLevels.length > 0) {
      const levels = experienceLevels.map((level) => level.id);
      baseQuery = baseQuery.in('experienceLevel', levels);
    }

    try {
      const sortedBy = sortBy !== 'newest';
      const {
        data: Jobs,
        error: JobsError,
        count,
      } = await baseQuery
        .order('createdAt', {
          ascending: sortedBy,
        })
        .range(offset, offset + limit - 1);

      if (JobsError) {
        throw Error(JobsError?.message) || new Error('Error getting jobs');
      }

      return { data: Jobs, count };
    } catch (error) {
      throw error?.response?.data?.message || new Error('Error getting jobs');
    }
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
    try {
      const { data, error } = await Client.from('jobs').select('*').match({ id: jobId }).single();

      return { data, error };
    } catch (error) {
      console.error(`Error getting job ${jobId}: ${error}`);
      throw error;
    }
  };

  /**
   * @title Create job
   * @param {object} job
   * @returns {Promise<Object>}
   * @memberof Supabase
   * @example
   * const newJob = Client.createJob(job)
   * const { data, error } = newJob
   */
  const createJob = async (job) => {
    const { data, error } = await Client.from('jobs')
      .insert(job, { returning: 'minimal' })
      .select();

    return { data, error };
  };

  /**
   * @title Update job
   * @param {string} jobId
   * @param {string} slug
   * @returns {Promise<Object>}
   * @memberof Supabase
   * @example
   * const updatedJob = Client.updateJob(jobId, job)
   * const { data, error } = updatedJob
   *
   */
  const updateJob = async (jobId, job) => {
    const { data, error } = await Client.from('jobs').update(job).match({ id: jobId }).select();

    return { data, error };
  };

  /**
   * @title Delete job
   * @param {string} jobId
   * @returns {Promise<Object>}
   * @memberof Supabase
   * @example
   * const removedJob = Client.removeJob('jobId')
   *  const { data, error } = removedJob
   */
  const removeJob = async (id) => {
    const { data, error } = await Client.from('jobs').delete().match({ id }).select();

    return { data, error };
  };

  /**
   * @title Search jobs by keyword on job title, job type, job category, company name, location
   * @param {string} keyword
   * @returns {Promise<Array>}
   * @memberof Supabase
   * @example
   * const jobs = Client.searchJobs('developer')
   **/
  const searchJobs = async (searchValue) => {
    const { data: jobs, error: jobsError } = await Client.from('jobs')
      .select()
      .textSearch('jobTitle,jobType,jobCategory,companyName,location', searchValue);

    if (jobsError) {
      throw Error(jobsError?.message) || new Error('Error getting jobs');
    }

    return jobs;
  };

  /**
   * @title Get jobs by ids
   * @param {Array} ids
   * @returns {Promise<Array>}
   * @memberof Supabase
   * @example const jobs = Client.getJobsByIds(['jobId1', 'jobId2'])
   * const { data, error } = jobs
   **/
  const getJobsByIds = async (ids) => {
    try {
      const { data: jobs, error } = await Client.from('jobs').select('*').in('id', ids);

      if (error) {
        throw new Error(error.message);
      }

      return { jobs, error: null, count: jobs.length };
    } catch (error) {
      return { jobs: null, error: error.message, count: 0 };
    }
  };

  /**
   * @title Get saved jobs
   * @param {string} userId
   * @returns {Promise<Array>}
   * @memberof Supabase
   * @example const savedJobs = Client.getSavedJobs('userId')
   * const { data, error } = savedJobs
   **/
  const getSavedJobs = async (userId) => {
    try {
      const { data: savedJobIds, error: savedJobsError } = await Client.from('savedJobs')
        .select('jobId')
        .eq('userId', userId);

      if (savedJobsError) {
        throw new Error(savedJobsError.message);
      }

      const { jobs } = await getJobsByIds(savedJobIds.map(({ jobId }) => jobId));

      return { data: jobs, error: null, count: jobs.length };
    } catch (error) {
      return { jobs: null, error: error.message, count: 0 };
    }
  };

  /**
   * @title Save job
   * @param {string} userId
   * @param {string} jobId
   * @returns {Promise<Object>}
   * @memberof Supabase
   * @example const savedJob = Client.saveJob('userId', 'jobId')
   * const { data, error } = savedJob
   **/
  const saveJob = async (userId, jobId) => {
    try {
      const { error } = await Client.from('savedJobs').insert({ userId, jobId }).select();

      return { success: true, error };
    } catch (error) {
      console.error(error);
      return { success: false, error: error?.response?.data?.message || 'Failed to save job.' };
    }
  };

  /**
   * @title Remove saved job
   * @param {string} userId
   * @param {string} jobId
   * @returns {Promise<Object>}
   * @memberof Supabase
   * @example const removedSavedJob = Client.removeSavedJob('userId', 'jobId')
   * const { data, error } = removedSavedJob
   * */
  const removeSavedJob = async (userId, jobId) => {
    try {
      const { data } = await Client.from('savedJobs').delete().match({ userId, jobId }).select();

      return { success: true, data };
    } catch (error) {
      console.error(error);
      return { success: false, error: 'Failed to remove saved job.' };
    }
  };

  /**
   * @title Get saved jobs ids
   * @param {string} userId
   * @returns {Promise<Array>}
   * @memberof Supabase
   * @example const savedJobsIds = Client.getSavedJobsIds('userId')
   * const { data, error } = savedJobsIds
   * */
  const getSavedJobsIds = async (userId) => {
    try {
      const { data: savedJobIds, error: savedJobsError } = await Client.from('savedJobs')
        .select('jobId')
        .eq('userId', userId);

      if (savedJobsError) {
        throw new Error(savedJobsError.message);
      }

      return { data: savedJobIds, error: null, count: savedJobIds.length };
    } catch (error) {
      return { data: null, error: error.message, count: 0 };
    }
  };

  /**
   * @title Suscribe to saved jobs count
   * @param {string} userId
   * @returns {Promise<Object>}
   * @memberof Supabase
   * @example const suscribedSavedJobsCount = Client.suscribeToSavedJobsCount('userId')
   * const { data, error } = suscribedSavedJobsCount
   * */
  const subscribeToSavedJobsCount = async (userId) => {
    try {
      const subscription = await Client.from('savedJobs')
        .on('*', async () => {
          const { count } = await getSavedJobsIds(userId);
          return count;
        })
        .eq('userId', userId)
        .subscribe();

      return subscription;
    } catch (error) {
      return { data: null, error: error.message, count: 0 };
    }
  };

  /**
   * @param {object} job
   * @returns {Promise<Object>}
   * @memberof Supabase
   * @example
   * const job = Client.uploadLogo({ slug: 'job-slug', file: file, filename: 'logo.png' })
   * const { data, error } = jobWithNewLogo
   */
  const uploadLogo = async ({ slug, file, filename }) => {
    const { data, error } = await Client.storage
      .from(`${slug}`)
      .upload(`public/${filename}`, file, {
        cacheControl: '3600',
        upsert: true,
      });

    return { data, error };
  };

  // Companies
  /**
   * @title Get all companies
   * @returns {Promise<Array>}
   * @memberof Supabase
   * @example
   * const companies = Client.getCompanies()
   * const { data, error } = companies
   */
  const getCompanies = async () => {
    const { data, error } = await Client.from('jobs').select(`id,
    userId,
    companyLogo,
    companyName,
    companyDescription,
    companyWebsite,
    companySlug,
    createdAt`);

    return { data, error };
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
    const { data, error } = await Client.from('jobs')
      .eq('id', companyId)
      .select(
        `id,
        userId,
        companyLogo,
        companyName,
        companyDescription,
        companyWebsite,
        companySlug,
        createdAt`
      );

    return { data, error };
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
    const { data, error } = await Client.from('categories').select();

    return { data, error };
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
    const { data, error } = await Client.from('categories')
      .select('*')
      .eq('id', categoryId)
      .select();

    return { data, error };
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
    const { data, error } = await Client.from('categories').upsert(category).select();

    return { data, error };
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
    const { data, error } = await Client.from('categories')
      .update(category)
      .match({ id: categoryId })
      .select();

    return { data, error };
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
    const { data, error } = await Client.from('categories')
      .delete()
      .match({ id: categoryId })
      .select();

    return { data, error };
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
    saveJob,
    removeSavedJob,
    getSavedJobs,
    getSavedJobsIds,
    subscribeToSavedJobsCount,
  };
};

export default Supabase;
