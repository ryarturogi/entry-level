import React from 'react';
import { OptionItem } from '@/types';

export type FiltersObjProps = {
  skills: OptionItem[];
  // ^?
  categories: OptionItem[];
  // ^?
  locations: OptionItem[];
  // ^?
  jobLocationTypes: string[];
  // ^?
  jobTypes: OptionItem[];
  // ^?
  experienceLevels: OptionItem[];
  // ^?
};

export interface ISelectedFiltersObjProps {
  categories: (number | string)[];
  skills: (number | string)[];
  locations: string[];
  jobType: string;
  jobTypeOptions: OptionItem[];
  experienceLevels: OptionItem[];
}

export interface IFiltersProps {
  onChange: React.Dispatch<React.SetStateAction<unknown>>;
  // ^?
  filters: FiltersObjProps;
  // ^?
}
