// Expiration Date
const createdAt = new Date();
const expirationDate = createdAt.setDate(createdAt.getDate() + 30);

export const EMPTY_JOB = {
  // The Job
  id: null,
  userId: null,
  jobType: 'remote',
  jobTitle: null,
  jobCategory: 'programming',
  jobDescription: null,
  jobTags: null,
  howToApply: null,
  salaryRate: null,
  isFeatured: false,
  isGuaranteed: false,
  hasCompanyColor: {
    isActive: false,
    color: null,
  },
  createdAt,
  expirationDate,

  // The Company
  companyLogo: null,
  companyName: null,
  companyEmail: null,
  companyWebsite: null,
  companyDescription: null,
  companyStatement: null,
  location: null,
};
// TODO: Regional Restrictions
export const CATEGORIES = [
  {
    id: 1,
    title: 'Programming',
    image: 'programming',
    slug: 'programming',
  },
  {
    id: 2,
    title: 'Design',
    image: 'design',
    slug: 'design',
  },
  {
    id: 3,
    title: 'Copywriting',
    image: 'copywriting',
    slug: 'copywriting',
  },
  {
    id: 4,
    title: 'Devops and Sysadmin',
    image: 'devops-and-sysadmin',
    slug: 'devops-and-sysadmin',
  },
  {
    id: 5,
    title: 'Business',
    image: 'business',
    slug: 'business',
  },
  {
    id: 6,
    title: 'Management and Finance',
    image: 'management-and-finance',
    slug: 'management-and-finance',
  },
  {
    id: 7,
    title: 'Product',
    image: 'product',
    slug: 'product',
  },
  {
    id: 8,
    title: 'Customer Support',
    image: 'customer-support',
    slug: 'customer-support',
  },
  {
    id: 9,
    title: 'Sales and Marketing',
    image: 'sales-and-marketing',
    slug: 'sales-and-marketing',
  },
  {
    id: 10,
    title: 'All Other',
    image: 'others',
    slug: 'others',
  },
];
export const JOBTYPES = [
  {
    key: 'remote',
    text: 'Remote',
    baseColor: 'remote',
  },
  {
    key: 'freelance',
    text: 'Freelance',
    baseColor: 'freelance',
  },
  {
    key: 'full-time',
    text: 'Full-Time',
    baseColor: 'full-time',
  },
  {
    key: 'part-time',
    text: 'Part-Time',
    baseColor: 'part-time',
  },
  {
    key: 'intern',
    text: 'Intern',
    baseColor: 'intern',
  },
];
