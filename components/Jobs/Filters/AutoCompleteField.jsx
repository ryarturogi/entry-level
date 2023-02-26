import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';
import ChevronIcon from 'public/img/chevron-icon.svg';
import { Fragment, useEffect, useState } from 'react';

const AutoCompleteField = ({ options, optionsSelected, onSelect, title, placeholder }) => {
  const [query, setQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleOnChange = (selected) => {
    onSelect(selected);
  };

  const handleOnRemove = (keyword) => {
    onSelect(optionsSelected.filter((option) => option.id !== keyword.id));
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

  // filter options based on query
  useEffect(() => {
    handleFilteredOptions(options);
  }, [query]);

  return (
    <div className="relative ">
      <section className="mb-5 ">
        <h3 className="text-base font-semibold leading-6 text-gray-900">{title}</h3>

        <div className="mt-4">
          <div className="max-w-72">
            <Combobox multiple onChange={handleOnChange} value={optionsSelected}>
              <div className="relative mt-1">
                <div className="relative flex items-center w-full overflow-hidden text-left bg-white border-2 rounded-lg cursor-default border-primary-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                  <Combobox.Input
                    className="w-full py-2.5 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none focus:ring-0"
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={placeholder}
                  />

                  <Combobox.Button className="absolute inset-y-0 right-0 flex pr-1.5 top-2 options-center">
                    <ChevronIcon className="w-6 h-6 text-primary-500" />
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
                    {filteredOptions.length === 0 && query !== '' ? (
                      <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                        Nothing found.
                      </div>
                    ) : (
                      filteredOptions.map((option) => (
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
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
          </div>
        </div>
      </section>

      <ul
        className={`flex flex-wrap gap-2 ${
          optionsSelected && optionsSelected?.length > 0 ? 'mb-5' : ''
        }`}
      >
        {optionsSelected.map((option) => (
          <li key={option.id}>
            <button
              className="inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-extralight bg-primary-100 text-black"
              onClick={() => handleOnRemove(option)}
              type="button"
            >
              <span>{option.name}</span>
              <span className="flex-shrink-0 ml-1.5 inline-flex text-black focus:outline-none">
                <span className="sr-only">Remove</span>
                <XMarkIcon aria-hidden="true" className="w-5 h-5 text-black" />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

AutoCompleteField.propTypes = {
  options: PropTypes.array,
  optionsSelected: PropTypes.array,
  onSelect: PropTypes.func,
  title: PropTypes.string,
  placeholder: PropTypes.string,
};

export default AutoCompleteField;
