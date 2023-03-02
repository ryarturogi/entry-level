import * as Yup from 'yup';
import { experienceLevelsOptions, jobCategories, jobLocationTypes, jobTypes } from './filters';

const requiredString = (fieldName) => Yup.string().required(`The ${fieldName} is required`);

const url = (fieldName) => Yup.string().url(`The ${fieldName} URL is not valid`);

const stringOrArray = (fieldName) =>
  Yup.mixed().test({
    name: 'stringOrArray',
    exclusive: true,
    message: `The ${fieldName} is required`,
    test: (value) => {
      if (typeof value === 'string') {
        return value.length > 0;
      }
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return false;
    },
  });

export const SchemaValidation = {
  companyName: requiredString('companyName'),
  companyWebsite: url('companyWebsite').required('The company website is required'),
  companyDescription: requiredString('companyDescription')
    .max(500, 'Must be 500 characters or less')
    .min(200, 'Must be 200 characters or more'),
  companyLogo: requiredString('companyLogo'),
  jobTitle: requiredString('jobTitle'),
  experienceLevel: stringOrArray('experienceLevel'),
  jobCategory: stringOrArray('jobCategory'),
  jobDescription: requiredString('jobDescription')
    .max(2000, 'Must be 2000 characters or less')
    .min(500, 'Must be 500 characters or more'),
  location: stringOrArray('job location'),
  jobLocationType: stringOrArray('jobLocationType'),
  jobType: stringOrArray('jobType'),
  jobSalary: requiredString('jobSalary'),
  jobTags: stringOrArray('jobTags'),
  howToApply: url('howToApply').required('The how to apply URL is required'),
};

export const COMPANY_FIELDS = [
  {
    name: 'companyName',
    label: 'Company Name',
    placeholder: 'What is the name of your company?',
    required: true,
    type: 'text',
  },
  {
    name: 'companyWebsite',
    label: 'Company Website',
    placeholder: 'What is the website of your company?',
    required: true,
    type: 'text',
  },
];

export const JOB_FIELDS = [
  {
    name: 'experienceLevel',
    label: 'Experience Level',
    placeholder: 'What is the experience level of the job?',
    required: true,
    type: 'select',
    options: experienceLevelsOptions,
    multiple: false,
  },
  {
    name: 'jobCategory',
    label: 'Job Category',
    placeholder: 'What is the category of the job?',
    required: true,
    type: 'select',
    options: jobCategories,
    multiple: false,
  },
  {
    name: 'location',
    label: 'Location',
    placeholder: 'What is the location of the job?',
    required: true,
    type: 'select',
    options: [],
    multiple: false,
  },
  {
    name: 'jobType',
    label: 'Job Type',
    placeholder: 'What is the type of the job?',
    required: true,
    type: 'select',
    options: jobTypes,
    multiple: false,
  },
  {
    name: 'jobLocationType',
    label: 'Remote/On-site',
    placeholder: 'What is the location type of the job?',
    required: true,
    type: 'select',
    options: jobLocationTypes,
    multiple: false,
  },

  {
    name: 'jobTags',
    label: 'Tags',
    placeholder: 'What are the skills of the job?',
    required: true,
    type: 'select',
    options: [],
    multiple: true,
  },
  {
    name: 'jobSalary',
    label: 'Job Salary',
    placeholder: 'What is the salary of the job?',
    required: true,
    type: 'text',
  },
  {
    name: 'howToApply',
    label: 'How to Apply',
    placeholder: 'How to apply for the job?',
    required: true,
    type: 'text',
  },
];

export const EXTRA_FEATURES_FIELDS = [
  {
    name: 'hasCompanyLogo',
    placeholder: 'Does your company have a logo?',
    required: false,
    type: 'checkbox',
    options: [
      {
        name: 'Does your company have a logo?',
        selected: false,
      },
    ],
  },
  {
    name: 'isFeatured',
    placeholder: 'Is the job featured?',
    required: false,
    type: 'checkbox',
    options: [
      {
        name: 'Is the job featured?',
        selected: false,
      },
    ],
  },
  {
    name: 'isGuaranteed',
    placeholder: 'Is the job guaranteed?',
    required: false,
    type: 'checkbox',
    options: [
      {
        name: 'Is the job guaranteed?',
        selected: false,
      },
    ],
  },
];

export const JOB_TITLE_FIELD = [
  {
    name: 'jobTitle',
    label: 'Job Title',
    placeholder: 'What is the title of the job?',
    required: true,
    type: 'text',
  },
];

export const INITIAL_VALUES = {
  companyName: 'Elastic',
  companyWebsite: 'https://elastic.co',
  companyDescription:
    'Elastic is a company that makes software for searching, analyzing, and visualizing data in real time.',
  companyLogo: '/img/logo.png',
  jobTitle: 'Senior Software Engineer',
  jobSalary: '3500',
  jobDescription:
    'We are looking for a Senior Software Engineer to join our team. You will be responsible for the development of our products.',
  experienceLevel: [],
  jobCategory: [],
  location: [],
  jobType: [],
  jobLocationType: [],
  jobTags: [],
  howToApply: 'https://elastic.co/careers',
  hasCompanyLogo: false,
  isFeatured: false,
  isGuaranteed: false,
};
