import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';
import ChevronIcon from 'public/img/chevron-icon.svg';
import { Fragment, useEffect, useState } from 'react';

const AutoCompleteField = ({
  options,
  optionsSelected,
  onSelect,
  title,
  placeholder,
  error,
  success,
  multiple,
}) => {
  const [query, setQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleOnChange = (selected) => {
    onSelect(Array.isArray(selected) ? selected : [selected]);
  };

  const handleOnRemove = (keyword) => {
    // check type of optionsSelected is array
    if (Array.isArray(optionsSelected)) {
      onSelect(optionsSelected.filter((option) => option.id !== keyword.id));
    } else if (typeof optionsSelected === 'object') {
      onSelect([optionsSelected].filter((option) => option.id !== keyword.id));
    }
  };

  const handleFilteredOptions = (options) => {
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

  const checkIfDataTypeExist = (value) => {
    // check if value is an array or object
    if (Array.isArray(value)) {
      return value.length === 0;
    } else if (typeof value === 'object') {
      return Object.keys(value).length === 0;
    }
  };

  // Array.isArray(optionsSelected) ? optionsSelected : [optionsSelected];
  const handleSelectedOptions = (optionsSelected) => {
    if (Array.isArray(optionsSelected)) {
      return optionsSelected;
    } else if (typeof optionsSelected === 'object') {
      return [optionsSelected];
    }
    return [];
  };

  // filter options based on query
  useEffect(() => {
    handleFilteredOptions(options);
  }, [query]);

  return (
    <div className="relative">
      <section>
        <h3 className="text-base font-semibold leading-6 text-gray-900 ">{title}</h3>

        <div className="mt-2">
          <div className="max-w-72">
            <Combobox multiple={multiple} onChange={handleOnChange} value={optionsSelected}>
              <div className="relative">
                <div
                  className={`${
                    error &&
                    'border-secondary-800 ring-secondary-800 focus:ring-secondary-800 ring-1'
                  } ${
                    success && 'border-primary-500'
                  } relative flex items-center w-full overflow-hidden text-left bg-white border rounded-lg cursor-default border-primary-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm placeholder:text-gray-800`}
                >
                  <Combobox.Input
                    className={
                      'w-full px-4 py-2 text-gray-700 bg-white border-0 border-primary-100 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 font-light'
                    }
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={placeholder}
                  />

                  <Combobox.Button className="absolute inset-y-0 right-0 flex pr-1.5 top-2 options-center">
                    <ChevronIcon
                      className={`w-6 h-6 ${error ? 'text-secondary-800' : 'text-primary-500'}`}
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
        {handleSelectedOptions(optionsSelected).map((option) => (
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

AutoCompleteField.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  optionsSelected: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  onSelect: PropTypes.func,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.string,
  multiple: PropTypes.bool,
};

export default AutoCompleteField;
