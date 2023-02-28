import Fallback from '@/components/UI/Fallback';
import useCountries from '@/hooks/useCountries';
import useSkills from '@/hooks/useSkills';
import PropTypes from 'prop-types';
import { Suspense, useEffect, useState } from 'react';
import AutoCompleteField from './AutoCompleteField';
import Checkbox from './Checkbox';
import { RadioField } from './RadioField';

const jobCategories = [
  { id: 'account-manager', name: 'Account Manager' },
  { id: 'accountant', name: 'Accountant' },
  { id: 'admin-assistant', name: 'Admin Assistant' },
  { id: 'animator', name: 'Animator' },
  { id: 'backend-developer', name: 'Backend Developer' },
  { id: 'blockchain-developer', name: 'Blockchain Developer' },
  { id: 'business-analyst', name: 'Business Analyst' },
  { id: 'content-writer', name: 'Content Writer' },
  { id: 'copywriter', name: 'Copywriter' },
  { id: 'data-scientist', name: 'Data Scientist' },
  { id: 'devops-engineer', name: 'DevOps Engineer' },
  { id: 'frontend-developer', name: 'Frontend Developer' },
  { id: 'fullstack-developer', name: 'Fullstack Developer' },
  { id: 'game-developer', name: 'Game Developer' },
  { id: 'graphic-designer', name: 'Graphic Designer' },
  { id: 'hr-manager', name: 'HR Manager' },
  { id: 'machine-learning-engineer ', name: 'Machine Learning Engineer' },
  { id: 'magazine-editor', name: 'Magazine Editor' },
  { id: 'marketing-manager', name: 'Marketing Manager' },
  { id: 'mobile-developer', name: 'Mobile Developer' },
  { id: 'operations-engineer', name: 'Operations Engineer' },
  { id: 'photographer', name: 'Photographer' },
  { id: 'product-designer', name: 'Product Designer' },
  { id: 'product-manager', name: 'Product Manager' },
  { id: 'qa-engineer', name: 'QA Engineer' },
  { id: 'recruiter', name: 'Recruiter' },
  { id: 'sales-manager', name: 'Sales Manager' },
  { id: 'scrum-master', name: 'Scrum Master' },
  { id: 'security-engineer', name: 'Security Engineer' },
  { id: 'seo-specialist', name: 'SEO Specialist' },
  { id: 'social-media-manager ', name: 'Social Media Manager' },
  { id: 'software-architect', name: 'Software Architect' },
  { id: 'software-engineer', name: 'Software Engineer' },
  { id: 'solution-architect', name: 'Solution Architect' },
  { id: 'technical-lead', name: 'Technical Lead' },
  { id: 'ui/ux-designer ', name: 'UI/UX Designer' },
  { id: 'ui/ux-engineer ', name: 'UI/UX Engineer' },
  { id: 'video-editor', name: 'Video Editor' },
  { id: 'web-developer', name: 'Web Developer' },
  { id: 'writer', name: 'Writer' },
];

const jobLocationTypes = [
  { id: 'all', name: 'Any' },
  { id: 'remote', name: 'Remote' },
  { id: 'on-site', name: 'On-Site' },
  { id: 'hybrid', name: 'Hybrid' },
];

const jobTypes = [
  { id: 'full-time', name: 'Full-Time' },
  { id: 'part-time', name: 'Part-Time' },
  { id: 'contract', name: 'Contract' },
  { id: 'temporary', name: 'Temporary' },
  { id: 'internship', name: 'Internship' },
  { id: 'freelance', name: 'Freelance' },
];

const experienceLevelsOptions = [
  { id: 'entry-level', name: 'Entry Level' },
  { id: 'mid-level', name: 'Mid Level' },
  { id: 'senior-level', name: 'Senior Level' },
  { id: 'expert', name: 'Sensei Master' },
];

const Filters = ({ onChange = [] }) => {
  const allCountries = useCountries();
  const allSkills = useSkills();

  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const [skillsSelected, setskillsSelected] = useState([]);
  const [locationsSelected, setLocationsSelected] = useState([]);
  const [jobLocationTypesSelected, setJobLocationTypesSelected] = useState('all');
  const [jobTypesSelected, setJobTypesSelected] = useState([]);
  const [experienceLevelsSelected, setExperienceLevelsSelected] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  const handleOnChangeCategories = (values) => {
    setCategoriesSelected([...values]);
  };

  const handleOnChangeSkills = (values) => {
    setskillsSelected([...values]);
  };

  const handleOnChangeLocations = (values) => {
    setLocationsSelected([...values]);
  };

  const handleLocationTypesChange = (jobType) => {
    setJobLocationTypesSelected(jobType);
  };

  const handleJobTypesChange = (jobTypes) => {
    const selectedJobTypes = jobTypes.filter((type) => type.selected);
    setJobTypesSelected(selectedJobTypes);
  };

  const handleExperienceLevelsChange = (experienceLevels) => {
    const selectedExperienceLevels = experienceLevels.filter((level) => level.selected);
    setExperienceLevelsSelected(selectedExperienceLevels);
  };

  // refetch data when filters change
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }

    const selectedFilters = {
      categories: categoriesSelected.map((category) => category.id),
      skills: skillsSelected.map((skill) => skill.id),
      locations: locationsSelected.map((location) => location.name),
      jobType: jobLocationTypesSelected,
      jobTypeOptions: jobTypesSelected,
      experienceLevels: experienceLevelsSelected,
    };

    onChange(selectedFilters);
  }, [
    categoriesSelected,
    skillsSelected,
    locationsSelected,
    jobLocationTypesSelected,
    jobTypesSelected,
    experienceLevelsSelected,
  ]);

  return (
    <aside className="col-span-12 px-8 py-6 bg-white lg:col-span-4 rounded-xl">
      <header>
        <h2 className="mb-5 text-2xl font-semibold leading-6 text-gray-900">Filters</h2>
      </header>

      {/* Categories */}
      <Suspense fallback={<Fallback message="Loading Categories..." />}>
        {jobCategories?.length > 0 && (
          <AutoCompleteField
            onSelect={handleOnChangeCategories}
            options={jobCategories}
            optionsSelected={categoriesSelected}
            placeholder="e.g. Software Engineer, UI/UX Designer, etc."
            title="Categories"
          />
        )}
      </Suspense>

      {/* Skills/Technologies */}
      <Suspense fallback={<Fallback message="Loading Skills..." />}>
        {allSkills?.length > 0 && (
          <AutoCompleteField
            onSelect={handleOnChangeSkills}
            options={allSkills}
            optionsSelected={skillsSelected}
            placeholder="e.g. React, Vue, Node, etc."
            title="Tech/Skills"
          />
        )}
      </Suspense>

      {/* Locations */}
      <Suspense fallback={<Fallback message="Loading Locations..." />}>
        {allCountries?.length > 0 && (
          <AutoCompleteField
            onSelect={handleOnChangeLocations}
            options={allCountries}
            optionsSelected={locationsSelected}
            placeholder="e.g. United States, Spain, etc."
            title="Location"
          />
        )}
      </Suspense>

      {/* In Person/Remote */}
      <Suspense fallback={<Fallback message="Loading In Person/Remote..." />}>
        <RadioField
          onChange={handleLocationTypesChange}
          options={jobLocationTypes}
          optionSelected={jobLocationTypesSelected}
          title="In Person/Remote"
        />
      </Suspense>

      {/* job Type */}
      <Suspense fallback={<Fallback message="Loading Job times..." />}>
        <Checkbox
          onChange={handleJobTypesChange}
          options={jobTypes}
          optionsSelected={jobTypesSelected}
          title="Job Type"
        />
      </Suspense>

      {/* Experience Level */}
      <Suspense fallback={<Fallback message="Loading Experience Levels..." />}>
        <Checkbox
          onChange={handleExperienceLevelsChange}
          options={experienceLevelsOptions}
          optionsSelected={experienceLevelsSelected}
          title="Experience Level"
        />
      </Suspense>
    </aside>
  );
};

Filters.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Filters;
