import { createClient } from '@supabase/supabase-js';
import { slugify } from '@/utils/slugify';

const Supabase = function () {
  // init using Supabase service
  this.client = createClient(
    process.env.NEXT_PUBLIC_PROVIDER_URL,
    process.env.NEXT_PUBLIC_PROVIDER_KEY
  );

  // Auth
  this.auth = this.client.auth;
  // Jobs

  /**
   * @title Get all jobs
   * @returns {Promise<Array>}
   * @memberof Supabase
   * @example
   * const jobs = this.client.getJobs()
   **/
  this.getJobs = async () => {
    let { data: Jobs } = await this.client.from('Jobs').select('*');
    return Jobs;
  };

  /**
   * @title Get job by id
   * @param {string} jobId
   * @returns {Promise<Object>}
   * @memberof Supabase
   * @example
   * const job = this.client.getJob('jobId')
   **/
  this.getJob = async (jobId) => {
    let { data: Job } = await this.client.from('Jobs').select('*').eq('id', jobId);
    return Job;
  };

  /**
   * @title Create job
   * @param {string} slug
   * @returns {Promise<Object>}
   * @memberof Supabase
   * @example
   * const job = this.client.createJob('jobSlug')
   **/
  this.createJob = async (job) => {
    let { data: Job } = await this.client.from('messages').upsert(job);
    return Job;
  };

  /**
   * @title Update job
   * @param {string} jobId
   * @param {string} slug
   * @returns {Promise<Object>}
   * @memberof Supabase
   * @example
   * const newJob = this.client.updateJob(jobId, job)
   **/
  this.updateJob = async (jobId, job) => {
    let { data: Job } = await this.client.from('Jobs').update(job).match({ id: jobId });
    return Job;
  };

  /**
   * @title Delete job
   * @param {string} jobId
   * @returns {Promise<Object>}
   * @memberof Supabase
   * @example
   * const removedJob = this.client.removeJob('jobId')
   **/
  this.removeJob = async (jobId) => {
    let { data: Job } = await this.client.from('Jobs').delete().match({ id: jobId });
    return Job;
  };

  /**
   * @title Upload job logo
   * @param {object} job
   * @returns {Promise<Object>}
   * @memberof Supabase
   * @example
   * const job = this.client.uploadLogo(company, file)
   **/
  this.uploadLogo = async (company, file) => {
    let { data: Logo } = await this.client.storage
      .from('company-logos')
      .upload(`public/img/logos/${slugify(company)}.png`, file, {
        cacheControl: '3600',
        upsert: true,
      });
    return Logo;
  };

  // Companies
  /**
   * @title Get all companies
   * @returns {Promise<Array>}
   * @memberof Supabase
   * @example
   * const companies = this.client.getCompanies()
   **/
  this.getCompanies = async () => {
    let { data: Companies } = await this.client.from('Jobs').select(`id,
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
   * const company = this.client.getCompany('companyId')
   **/
  this.getCompany = async (companyId) => {
    let { data: Company } = await this.client
      .from('Jobs')
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
   * const categories = this.client.getCategories()
   **/
  this.getCategories = async () => {
    let { data: Categories } = await this.client.from('Categories').select('*');
    return Categories;
  };

  /**
   * @title Get category by id
   * @param {string} categoryId
   * @returns {Promise<Object>}
   * @memberof Supabase
   * @example
   * const category = this.client.getCategory('categoryId')
   **/
  this.getCategory = async (categoryId) => {
    let { data: Category } = await this.client.from('Categories').select('*').eq('id', categoryId);
    return Category;
  };

  /**
   * @title Create category
   * @param {object} category
   * @returns {Promise<Object>}
   * @memberof Supabase
   * @example
   * const category = this.client.createCategory(category)
   **/
  this.createCategory = async (category) => {
    let { data: Category } = await this.client.from('Categories').upsert(category);
    return Category;
  };

  /**
   * @title Update category
   * @param {string} categoryId
   * @param {object} category
   * @returns {Promise<Object>}
   * @memberof Supabase
   * @example
   * const newCategory = this.client.updateCategory(categoryId, category)
   **/
  this.updateCategory = async (categoryId, category) => {
    let { data: Category } = await this.client
      .from('Categories')
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
   * const removedCategory = this.client.removeCategory(categoryId)
   **/
  this.removeCategory = async (categoryId) => {
    let { data: Category } = await this.client
      .from('Categories')
      .delete()
      .match({ id: categoryId });
    return Category;
  };

  return this;
};

export default Supabase;
