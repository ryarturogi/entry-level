import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import ChevronIcon from 'public/img/chevron-icon.svg';
import React, { Fragment, useEffect, useState } from 'react';
import { OptionItem } from '@/types';
import { AutoCompleteProps } from './types';

const AutoComplete: React.FC<AutoCompleteProps> = (
  props: AutoCompleteProps
): React.ReactElement => {
  const {
    options,
    optionsSelected,
    onChange,
    title,
    placeholder,
    error,
    multiple = false,
    required,
    setTouched,
    name,
  } = props;

  const [query, setQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleOnChange = (selected: OptionItem[] | OptionItem) => {
    onChange(Array.isArray(selected) ? selected : [selected]);
  };

  const handleOnRemove = (keyword: OptionItem) => {
    if (Array.isArray(optionsSelected)) {
      onChange(optionsSelected.filter((option: OptionItem) => option.id !== keyword.id));
    } else if (typeof optionsSelected === 'object') {
      onChange([optionsSelected].filter((option: OptionItem) => option.id !== keyword.id));
    }
  };

  const handleFilteredOptions = (options: OptionItem[]) => {
    setFilteredOptions(
      query === ''
        ? options
        : options.filter((option) =>
            option.name
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.toLowerCase().replace(/\s+/g, ''))
          )
    );
  };

  const checkIfDataTypeExist = (value: unknown): boolean => {
    // check if value is an array or object
    if (Array.isArray(value)) {
      return value.length === 0;
    } else if (typeof value === 'object') {
      return Object.keys(value).length === 0;
    }
    return false; // default case
  };

  const handleSelectedOptions = (optionsSelected: OptionItem[] | OptionItem) => {
    if (Array.isArray(optionsSelected)) {
      return optionsSelected;
    } else if (typeof optionsSelected === 'object') {
      return [optionsSelected];
    }
    return [];
  };

  const handleOnFocus = (fieldName: string) => {
    if (!setTouched) {
      return;
    }
    setTouched(fieldName);
  };

  // filter options based on query
  useEffect(() => {
    handleFilteredOptions(options);
  }, [query]);

  return (
    <div className="relative">
      <section>
        {title && (
          <label htmlFor={title}>
            <div className="flex space-x-1.5 mb-1.5 text-base font-medium text-gray-700">
              <span>{title}</span>
              {required && (
                <span className="text-secondary-800" title={error}>
                  *
                </span>
              )}
            </div>
          </label>
        )}

        <div className="mt-2">
          <div className="max-w-72">
            <Combobox multiple={multiple} onChange={handleOnChange} value={optionsSelected}>
              <div className="relative">
                <div
                  className={`w-full  text-gray-700 bg-white border-2 border-primary-100 rounded-lg shadow-sm appearance-none font-light focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent ${
                    error && 'border-secondary-300'
                  }`}
                >
                  <Combobox.Input
                    as="input"
                    className={`w-full px-4 py-2.5 text-gray-700 bg-white border-0 border-primary-100 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 placeholder:text-sm focus:ring-primary-600 focus:border-primary-600 font-light ${
                      error && 'placeholder:text-secondary-300'
                    }`}
                    id={title}
                    onBlur={() => handleOnFocus(name)}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={placeholder}
                  />

                  <Combobox.Button
                    as="button"
                    className="absolute inset-y-0 right-0 flex pr-1.5 top-3 options-center"
                  >
                    <ChevronIcon
                      className={`w-6 h-6 ${error ? 'text-secondary-300' : 'text-primary-500'}`}
                    />
                  </Combobox.Button>
                </div>

                <Transition
                  afterLeave={() => setQuery('')}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Combobox.Options className="absolute z-20 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredOptions.map((option) => (
                      <Combobox.Option
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-teal-600 text-white' : 'text-gray-900'
                          }`
                        }
                        key={option.id}
                        value={option}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {option.name}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 top-2 flex options-center pl-3 ${
                                  active ? 'text-white' : 'text-teal-600'
                                }`}
                              >
                                <CheckIcon aria-hidden="true" className="w-5 h-5" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
            {error && (
              <p className="mt-2 text-sm text-secondary-800" id="email-error">
                {error}
              </p>
            )}
          </div>
        </div>
      </section>

      <ul
        className={`flex flex-wrap gap-2 ${
          checkIfDataTypeExist(optionsSelected) ? 'hidden' : 'mt-2'
        }`}
      >
        {handleSelectedOptions(optionsSelected).map((option: OptionItem) => (
          <li key={option.id}>
            <button
              className="inline-flex items-center pl-3 pr-2.5 py-1.5 rounded-full text-xs font-light bg-primary-100 text-black"
              onClick={() => handleOnRemove(option)}
              type="button"
            >
              <span>{option.name}</span>
              <span className="flex-shrink-0 ml-1.5 inline-flex text-black focus:outline-none">
                <span className="sr-only">Remove</span>
                <XMarkIcon aria-hidden="true" className="w-4 h-4 text-black" />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutoComplete;
