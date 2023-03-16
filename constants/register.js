import * as Yup from 'yup';
import {
  emailValidation,
  passwordValidation,
  phoneValidation,
  requiredString,
  stringOrArray,
  url,
} from './helpers';

export const CAREER_OPTIONS = [
  {
    name: 'Frontend Developer',
    id: 'frontend-developer',
  },
  {
    name: 'Backend Developer',
    id: 'backend-developer',
  },
  {
    name: 'Fullstack Developer',
    id: 'fullstack-developer',
  },
  {
    name: 'UI/UX Designer',
    id: 'ui/ux-designer',
  },
  {
    name: 'Product Manager',
    id: 'product-manager',
  },
  {
    name: 'Project Manager',
    id: 'project-manager',
  },
  {
    name: 'Data Scientist',
    id: 'data-scientist',
  },
  {
    name: 'Data Analyst',
    id: 'data-analyst',
  },
  {
    name: 'Data Engineer',
    id: 'data-engineer',
  },
  {
    name: 'DevOps Engineer',
    id: 'devops-engineer',
  },
  {
    name: 'QA Engineer',
    id: 'qa-engineer',
  },
];

export const ROLES = {
  CANDIDATE: 'candidate',
  COMPANY: 'company',
};

export const ROLE_OPTIONS = [
  { id: 'candidate', name: 'Candidate' },
  { id: 'company', name: 'Company' },
];

export const STEPS = {
  SELECT_ROLE: 'role-selection',
  CREDENTIALS: 'credentials',
  REGISTER_INFO: 'register-info',
};

export const INITIAL_VALUES = {
  role: ROLES.CANDIDATE,
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  career: [],
  companyName: '',
  companyDescription: '',
  companyWebsite: '',
  industry: [],
  size: [],
  location: [],
  avatar_url: '',
};

export const CREDENTIALS_FIELDS = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'What is your email?',
    required: true,
    type: 'text',
  },
];

export const CANDIDATE_FIELDS = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'What is your name?',
    required: true,
    type: 'text',
  },
  {
    name: 'phone',
    label: 'Phone',
    placeholder: 'What is your phone number?',
    required: true,
    type: 'text',
  },
  {
    name: 'career',
    label: 'Career',
    placeholder: 'What is your career?',
    required: true,
    type: 'select',
    options: CAREER_OPTIONS,
    multiple: false,
  },
];

export const COMPANY_FIELDS = [
  {
    name: 'companyName',
    label: 'Name',
    placeholder: 'What is the name of your company?',
    required: true,
    type: 'text',
  },
  {
    name: 'phone',
    label: 'Phone <small style="color: #aaa; position: relative; top: -3px">(optional)</small>',
    placeholder: 'What is your company phone?',
    required: false,
    type: 'text',
  },

  {
    name: 'companyWebsite',
    label: 'Website',
    placeholder: 'What is the website of your company?',
    required: true,
    type: 'text',
  },
  {
    name: 'location',
    label: 'Location',
    placeholder: 'What is the location of your company?',
    required: true,
    type: 'select',
    options: [],
    multiple: false,
  },
  {
    name: 'industry',
    label: 'Industry',
    placeholder: 'What is the industry of your company?',
    required: true,
    type: 'select',
    options: [
      {
        id: 'accounting',
        name: 'Accounting',
      },
      {
        id: 'advertising',
        name: 'Advertising',
      },
      {
        id: 'aerospace',
        name: 'Aerospace',
      },
      {
        id: 'agriculture',
        name: 'Agriculture',
      },
      {
        id: 'automotive',
        name: 'Automotive',
      },
      {
        id: 'banking',
        name: 'Banking',
      },
      {
        id: 'biotechnology',
        name: 'Biotechnology',
      },
    ],
    multiple: false,
  },
  {
    name: 'size',
    label: 'Size',
    placeholder: 'What is the size of your company?',
    required: true,
    type: 'select',
    options: [
      {
        id: '1-10',
        name: '1-10',
      },
      {
        id: '11-50',
        name: '11-50',
      },
      {
        id: '51-200',
        name: '51-200',
      },
      {
        id: '201-500',
        name: '201-500',
      },
      {
        id: '501-1000',
        name: '501-1000',
      },
      {
        id: '1001-5000',
        name: '1001-5000',
      },
      {
        id: '5001-10000',
        name: '5001-10000',
      },
    ],
    multiple: false,
  },
  {
    name: 'companyDescription',
    label: 'Description',
    placeholder: 'What is the description of your company?',
    required: true,
    type: 'textarea',
  },
];

export const CandidateSchemaValidation = Yup.object().shape({
  name: requiredString('name'),
  phone: phoneValidation('phone number'),
  email: emailValidation('email address'),
  password: passwordValidation('password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
  career: stringOrArray('career'),
});

export const CompanySchemaValidation = Yup.object().shape({
  name: requiredString('name'),
  email: emailValidation('email address'),
  phone: phoneValidation('phone number'),
  password: passwordValidation('password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
  companyName: requiredString('company name'),
  companyWebsite: url('How To Apply').required('The how to apply URL is required'),
  industry: stringOrArray('Industry'),
  size: stringOrArray('Size'),
  location: stringOrArray('Location'),
  companyDescription: requiredString('company description')
    .max(2000, 'Must be 2000 characters or less')
    .min(500, 'Must be 500 characters or more'),
});

export const SCHEMAS = {
  candidate: CandidateSchemaValidation,
  company: CompanySchemaValidation,
};
