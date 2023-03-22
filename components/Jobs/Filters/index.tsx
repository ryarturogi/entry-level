import AutoComplete from '@/components/Form/AutoComplete';
import Checkbox from '@/components/Form/Checkbox';
import RadioField from '@/components/Form/RadioField';
import Fallback from '@/components/UI/Fallback';
import {
  experienceLevelsOptions,
  jobCategories,
  jobLocationTypes,
  jobTypes,
} from '@/constants/filters';
import useCountries from '@/hooks/useCountries';
import useSkills from '@/hooks/useSkills';
import PropTypes from 'prop-types';
import React, { Suspense, useEffect, useState } from 'react';
import { IFiltersProps, ISelectedFiltersObjProps } from './types';
import { OptionItem } from '@/types';

const Filters = (props: IFiltersProps): React.ReactElement => {
  const { onChange } = props;
  const allCountries: OptionItem[] = useCountries();
  const allSkills: OptionItem[] = useSkills();
  const [categoriesSelected, setCategoriesSelected] = useState<OptionItem[]>([]);
  const [skillsSelected, setskillsSelected] = useState<OptionItem[]>([]);
  const [locationsSelected, setLocationsSelected] = useState<OptionItem[]>([]);
  const [jobLocationTypesSelected, setJobLocationTypesSelected] = useState<string>('all');
  const [jobTypesSelected, setJobTypesSelected] = useState<OptionItem[]>([]);
  const [experienceLevelsSelected, setExperienceLevelsSelected] = useState<OptionItem[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const handleOnChangeCategories = (values: OptionItem[]) => {
    setCategoriesSelected([...values]);
  };

  const handleOnChangeSkills = (values: OptionItem[]) => {
    setskillsSelected([...values]);
  };

  const handleOnChangeLocations = (values: OptionItem[]) => {
    setLocationsSelected([...values]);
  };

  const handleLocationTypesChange = (jobType: string) => {
    setJobLocationTypesSelected(jobType);
  };

  const handleJobTypesChange = (jobTypes: OptionItem[]) => {
    const selectedJobTypes = jobTypes.filter((type: OptionItem) => type.selected);
    setJobTypesSelected(selectedJobTypes);
  };

  const handleExperienceLevelsChange = (experienceLevels: OptionItem[]) => {
    const selectedExperienceLevels = experienceLevels.filter((level: OptionItem) => level.selected);
    setExperienceLevelsSelected(selectedExperienceLevels);
  };

  // refetch data when filters change
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }

    const selectedFilters: ISelectedFiltersObjProps = {
      categories: categoriesSelected.map((category) => String(category.id)),
      skills: skillsSelected.map((skill) => String(skill.id)),
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
    <aside className="col-span-12 px-8 py-6 bg-white lg:col-span-4 rounded-xl h-fit">
      <header>
        <h2 className="mb-5 text-2xl font-semibold leading-6 text-gray-900">Filters</h2>
      </header>

      <div className="grid gap-4 cols-span-1">
        {/* Categories */}
        <Suspense fallback={<Fallback message="Loading Categories..." />}>
          {jobCategories?.length > 0 && (
            <AutoComplete
              multiple
              onChange={handleOnChangeCategories}
              options={jobCategories}
              optionsSelected={categoriesSelected}
              placeholder="e.g. Software Engineer..."
              setTouched={() => {}}
              title="Specialties"
              touched={false}
            />
          )}
        </Suspense>

        {/* Skills/Technologies */}
        <Suspense fallback={<Fallback message="Loading Skills..." />}>
          {allSkills?.length > 0 && (
            <AutoComplete
              multiple
              onChange={handleOnChangeSkills}
              options={allSkills}
              optionsSelected={skillsSelected}
              placeholder="e.g. React, Vue, Node..."
              setTouched={() => {}}
              title="Tech/Skills"
              touched={false}
            />
          )}
        </Suspense>

        {/* Locations */}
        <Suspense fallback={<Fallback message="Loading Locations..." />}>
          {allCountries?.length > 0 && (
            <AutoComplete
              multiple
              onChange={handleOnChangeLocations}
              options={allCountries}
              optionsSelected={locationsSelected}
              placeholder="e.g. United States, Spain..."
              setTouched={() => {}}
              title="Location"
              touched={false}
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
            multiple
            onChange={handleJobTypesChange}
            options={jobTypes}
            optionsSelected={jobTypesSelected}
            title="Job Type"
          />
        </Suspense>

        {/* Experience Level */}
        <Suspense fallback={<Fallback message="Loading Experience Levels..." />}>
          <Checkbox
            multiple
            onChange={handleExperienceLevelsChange}
            options={experienceLevelsOptions}
            optionsSelected={experienceLevelsSelected}
            title="Experience Level"
          />
        </Suspense>
      </div>
    </aside>
  );
};

Filters.propTypes = {
  onChange: PropTypes.func.isRequired,
  filters: PropTypes.object,
};

export default Filters;
