// Expiration Date
const createdAt = new Date();
const expirationDate = createdAt.setDate(createdAt.getDate() + 30);

export const EMPTY_JOB = {
  // The Company
  companyDescription: null,
  companyEmail: null,
  companyLogo: null,
  companyName: null,
  companyStatement: null,
  companyWebsite: null,
  createdAt,
  expirationDate,
  hasCompanyColor: {
    color: null,
    isActive: false,
  },
  howToApply: null,
  // The Job
  id: null,
  isFeatured: false,
  isGuaranteed: false,
  jobCategory: 'programming',
  jobDescription: null,
  jobTags: null,
  jobTitle: null,
  jobType: 'remote',
  location: null,
  salaryRate: null,
  userId: null,
};

export const CATEGORIES = [
  {
    id: 1,
    image: 'programming',
    slug: 'programming',
    title: 'Programming',
  },
  {
    id: 2,
    image: 'design',
    slug: 'design',
    title: 'Design',
  },
  {
    id: 3,
    image: 'copywriting',
    slug: 'copywriting',
    title: 'Copywriting',
  },
  {
    id: 4,
    image: 'devops-and-sysadmin',
    slug: 'devops-and-sysadmin',
    title: 'Devops and Sysadmin',
  },
  {
    id: 5,
    image: 'business',
    slug: 'business',
    title: 'Business',
  },
  {
    id: 6,
    image: 'management-and-finance',
    slug: 'management-and-finance',
    title: 'Management and Finance',
  },
  {
    id: 7,
    image: 'product',
    slug: 'product',
    title: 'Product',
  },
  {
    id: 8,
    image: 'customer-support',
    slug: 'customer-support',
    title: 'Customer Support',
  },
  {
    id: 9,
    image: 'sales-and-marketing',
    slug: 'sales-and-marketing',
    title: 'Sales and Marketing',
  },
  {
    id: 10,
    image: 'others',
    slug: 'others',
    title: 'All Other',
  },
];

export const JOBTYPES = [
  {
    baseColor: 'remote',
    key: 'remote',
    text: 'Remote',
  },
  {
    baseColor: 'freelance',
    key: 'freelance',
    text: 'Freelance',
  },
  {
    baseColor: 'full-time',
    key: 'full-time',
    text: 'Full-Time',
  },
  {
    baseColor: 'part-time',
    key: 'part-time',
    text: 'Part-Time',
  },
  {
    baseColor: 'intern',
    key: 'intern',
    text: 'Intern',
  },
];
