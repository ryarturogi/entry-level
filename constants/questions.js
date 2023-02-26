const Skills = [
  'AI/ML',
  'Agile',
  'Android',
  'Angular',
  'AngularJS',
  'Apache',
  'ASP.NET',
  'AWS',
  'Azure',
  'Cassandra',
  'C',
  'C#',
  'C++',
  'Chef',
  'Clojure',
  'Cocoa',
  'Cocoa Touch',
  'CodeIgniter',
  'Cordova',
  'Cloud Computing',
  'CSS',
  'D3.js',
  'Dart',
  'DevOps',
  'Django',
  'Docker',
  'Drupal',
  'Elasticsearch',
  'Elixir',
  'Erlang',
  'Express',
  'Flask',
  'Go',
  'GraphQL',
  'Groovy',
  'Hadoop',
  'Haskell',
  'HTML',
  'HTML/CSS',
  'Java',
  'JavaScript',
  'jQuery',
  'Kotlin',
  'Laravel',
  'Linux',
  'Lua',
  'Magento',
  'MariaDB',
  'MongoDB',
  'MySQL',
  'Node.js',
  'Objective-C',
  'Oracle',
  'Perl',
  'PHP',
  'PostgreSQL',
  'PowerShell',
  'Project Management',
  'Product Management',
  'Python',
  'R',
  'React',
  'React Native',
  'Redis',
  'Ruby',
  'Ruby on Rails',
  'Rust',
  'Sass',
  'Scala',
  'SharePoint',
  'Shell',
  'Spring',
  'SQL',
  'SQL Server',
  'Swift',
  'Symfony',
  'Testing',
  'Terraform',
  'TypeScript',
  'Vue.js',
  'Windows',
  'WordPress',
  'Xamarin',
  'Xcode',
  'XML',
  'XSLT',
  'Yarn',
  'Zend',
  '3D modeling',
  'AI/ML',
  'Adobe Creative Suite',
  'Animation',
  'Business Analysis',
  'Cloud Computing',
  'Customer Service',
  'Data Analysis',
  'Data Engineering',
  'DevOps',
  'Embedded Systems',
  'Figma',
  'Game Development',
  'IoT',
  'Interaction design',
  'Motion graphics',
  'Network Engineering',
  'Photography',
  'Print design',
  'Project Management',
  'Quality Assurance',
  'Security',
  'Sketch',
  'Software Development',
  'Testing',
  'UI design',
  'UI/UX Design',
  'User experience (UX) design',
  'Video editing',
  'Web Development',
  'Branding',
  'Other',
];

const ProgrammingLanguages = [
  'C',
  'C#',
  'C++',
  'Clojure',
  'Dart',
  'Elixir',
  'Erlang',
  'Go',
  'Haskell',
  'Java',
  'JavaScript',
  'Kotlin',
  'Lisp',
  'Objective-C',
  'Perl',
  'PHP',
  'Python',
  'R',
  'Rust',
  'Ruby',
  'Scala',
  'SQL',
  'Swift',
  'TypeScript',
  'Rust',
  'Docker',
  'Elixir',
  'Erlang',
  'Express',
  'Flask',
  'GraphQL',
  'Kubernetes',
  'Node.js',
  'React',
  'React-Native',
  'Rust',
  'Spring',
  'Vue.js',
];

const Industries = [
  '3D printing',
  'AI/Machine Learning',
  'Advertising',
  'Agriculture',
  'Aerospace',
  'Air transportation',
  'Analytics',
  'Automation',
  'Automotive',
  'Banking',
  'Blockchain',
  'Bioscience',
  'Business consulting',
  'Clean energy',
  'Clinical research',
  'Cloud computing',
  'Communications',
  'Computer-aided design',
  'Computer hardware',
  'Computer networking',
  'Computer systems design',
  'Construction',
  'Consumer electronics',
  'Consumer packaged goods',
  'Consumer products',
  'Content management',
  'Consulting',
  'CRM software',
  'Customer service',
  'Cybersecurity',
  'Data Science and Data Engineering',
  'Defense',
  'Digital marketing',
  'E-commerce',
  'E-government',
  'E-learning',
  'Education',
  'Electronics',
  'Employment',
  'Energy and utilities',
  'Energy management',
  'Engineering consulting',
  'Environmental consulting',
  'Facilities management',
  'Fashion',
  'Film and video',
  'Finance',
  'Food and beverage',
  'Gaming and Online Casinos',
  'GIS',
  'Government',
  'Graphic design',
  'Healthcare',
  'Hospitality',
  'Human resources',
  'Industrial automation',
  'Industrial design',
  'Information technology',
  'Infrastructure',
  'Insurance',
  'Internet of Things (IoT)',
  'Investment banking',
  'IT consulting',
  'IT services',
  'IT staffing',
  'Landscaping',
  'Law enforcement',
  'Legal',
  'Logistics',
  'Management consulting',
  'Manufacturing',
  'Materials science',
  'Medical devices',
  'Medical software',
  'Mining',
  'Non-profit',
  'Oceanography',
  'Oil and gas',
  'Online marketplaces',
  'Online media',
  'Operations management',
  'Outsourcing',
  'Pharmaceuticals',
  'Photography',
  'Plant automation',
  'Product design',
  'Professional services',
  'Public safety',
  'Public transportation',
  'Publishing',
  'Quality assurance',
  'Radio broadcasting',
  'Recruiting',
  'Renewable energy',
  'Research and development',
  'Security',
  'Service management',
  'Social media',
  'Software as a service (SaaS)',
  'Space',
  'Special effects',
  'Supply chain management',
  'Technical writing',
  'Telemedicine',
  'Textile industry',
  'Think tanks',
  'Training',
  'Translation',
  'Transportation infrastructure',
  'Urban planning',
  'Venture capital',
  'Video game development',
  'Video production',
  'Virtual reality',
  'Visual effects',
  'Waste management',
  'Weather forecasting',
  'Web design and development',
  'Web hosting',
  'Wind energy',
  'Wireless',
  'Wood industry',
];

const QUESTIONS = [
  {
    text: 'What is your full name?',
    type: 'text',
    name: 'name',
  },
  {
    text: 'What is your current job title?',
    type: 'text',
    name: 'jobTitle',
  },
  {
    text: 'What industries are you interested in working in?',
    type: 'select',
    options: Industries,
    multiple: true,
    name: 'industries',
  },
  {
    text: 'What industries have you previously worked in?',
    type: 'select',
    options: Industries,
    multiple: true,
    name: 'previousIndustries',
  },
  {
    text: 'What is your availability for employment?',
    type: 'select',
    options: ['Full-time', 'Part-time', 'Contract'],
    name: 'availability',
  },
  {
    text: 'What is your current employment status?',
    type: 'select',
    options: ['Employed', 'Self-employed', 'Unemployed'],
    name: 'employmentStatus',
  },
  {
    text: 'What is your current availability for employment?',
    type: 'select',
    options: ['Immediately', '2 weeks notice', '1 month notice'],
    name: 'currentAvailability',
  },
  {
    text: 'What is your highest level of education completed?',
    type: 'select',
    options: [
      'High School',
      'Associate Degree',
      'Bachelor Degree',
      'Master Degree',
      'Doctorate Degree',
    ],
    name: 'education',
  },
  {
    text: 'What languages do you speak fluently?',
    type: 'select',
    options: ['English', 'French', 'Spanish', 'Chinese', 'Japanese', 'Korean'],
    multiple: true,
    name: 'languages',
  },
  {
    text: 'What are your professional accomplishments (e.g. awards, publications, patents)?',
    type: 'textarea',
    name: 'accomplishments',
  },
  {
    text: 'What is your work authorization status?',
    type: 'select',
    options: ['Citizen', 'Permanent Resident', 'Authorized to work'],
    name: 'workAuthorization',
  },
  {
    text: 'Please select your job experiences:',
    type: 'select',
    options: Skills,
    multiple: true,
    name: 'experiences',
  },
  {
    text: 'Please enter any additional job experiences:',
    type: 'textarea',
    name: 'additionalSkills',
  },
  {
    text: 'Have you completed any internships or apprenticeships?',
    type: 'select',
    options: ['Yes', 'No'],
    name: 'internships',
  },
  {
    text: 'Do you have any relevant volunteering experience?',
    type: 'select',
    options: ['Yes', 'No'],
    name: 'volunteering',
  },
  {
    text: 'Do you have any relevant public speaking experience?',
    type: 'select',
    options: ['Yes', 'No'],
    name: 'publicSpeaking',
  },
  {
    text: 'Do you have any relevant writing experience (e.g. technical writing, blogging, journalism)?',
    type: 'select',
    options: ['Blogging', 'Journalism', 'Technical Writing', 'Other'],
    name: 'writing',
  },
  {
    text: 'Have you previously worked on any relevant projects (e.g. personal projects, group projects)?',
    type: 'select',
    options: ['Yes', 'No'],
    name: 'projects',
  },
  {
    text: 'Please select your skills:',
    type: 'select',
    options: Skills,
    multiple: true,
    name: 'skills',
  },
  {
    text: 'Do you have any relevant skills or experience in leadership or management?',
    type: 'select',
    options: ['Yes', 'No'],
    name: 'leadership',
  },
  {
    text: 'Do you have any relevant experience in UI/UX design?',
    type: 'select',
    options: ['Yes', 'No'],
    name: 'uiux',
  },
  {
    text: 'What programming languages are you proficient in?',
    type: 'select',
    options: ProgrammingLanguages,
    multiple: true,
    name: 'programmingLanguages',
  },
  {
    text: 'What are your professional goals?',
    type: 'textarea',
    name: 'goals',
  },
  {
    text: 'Do you have any references we can contact?',
    type: 'textarea',
    name: 'references',
  },
  {
    text: 'Please provide the contact information for your references:',
    type: 'textarea',
    name: 'referenceInfo',
  },
];

export default QUESTIONS;
