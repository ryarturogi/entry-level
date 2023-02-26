import Fallback from '@/components/UI/Fallback';
import useCountries from '@/hooks/useCountries';
import PropTypes from 'prop-types';
import { Suspense, useEffect, useState } from 'react';
import AutoCompleteField from './AutoCompleteField';
import Checkbox from './Checkbox';
import { RadioField } from './RadioField';

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
];

const experienceLevelsOptions = [
  { id: 'entry-level', name: 'Entry Level' },
  { id: 'mid-level', name: 'Mid Level' },
  { id: 'senior-level', name: 'Senior Level' },
  { id: 'internship', name: 'Internship' },
  { id: 'expert', name: 'Expert' },
];

const Filters = ({ onChange, allSkills = [] }) => {
  const allCountries = useCountries();

  const [skillsSelected, setskillsSelected] = useState([]);
  const [locationsSelected, setLocationsSelected] = useState([]);
  const [jobLocationTypesSelected, setJobLocationTypesSelected] = useState('all');
  const [jobTypesSelected, setJobTypesSelected] = useState([]);
  const [experienceLevelsSelected, setExperienceLevelsSelected] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

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

    const skills = skillsSelected.map((skill) => skill.id);
    const locations = locationsSelected.map((location) => location.name);
    const jobType = jobLocationTypesSelected;
    const jobTypeOptions = jobTypesSelected;
    const experienceLevels = experienceLevelsSelected;

    onChange({ skills, locations, jobType, jobTypeOptions, experienceLevels });
  }, [
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

export const getStaticProps = async () => {
  const allSkills = await fetch('/api/p-languages')
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return [];
    });

  return {
    props: {
      allSkills,
    },
  };
};

Filters.propTypes = {
  onChange: PropTypes.func.isRequired,
  allSkills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

export default Filters;
