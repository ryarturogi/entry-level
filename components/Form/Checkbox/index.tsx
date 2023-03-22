import React, { useState } from 'react';
import { CheckboxProps } from './types';
import { OptionItem } from '@/types';

const Checkbox: React.FC<CheckboxProps> = (props: CheckboxProps): React.ReactElement => {
  const { options, optionsSelected, title, onChange, id, name, error } = props;
  const [optionsList, setOptionsList] = useState<OptionItem[]>(options);
  const [selected, setSelected] = useState<OptionItem[]>(optionsSelected);

  const handleOnChange = (option: OptionItem) => {
    const isSelected = selected.includes(option);
    const newSelected = isSelected
      ? selected.filter((selectedId) => selectedId.id !== option.id)
      : [...selected, option];
    setSelected(newSelected);
    const newOptions = optionsList.map((option) => {
      if (option.id === option.id) {
        return { ...option, selected: !isSelected };
      }
      return option;
    });
    setOptionsList(newOptions);
    onChange(newOptions);
  };

  return (
    <fieldset>
      {title && (
        <legend className="text-base font-semibold leading-6 text-gray-900">{title}</legend>
      )}

      <div className={title ? 'mt-2' : ''}>
        {optionsList?.length > 0 &&
          optionsList.map(
            (
              option: {
                id: any;
                name: string;
              },
              idx
            ) => (
              <div
                className="relative flex items-center py-1.5"
                key={`option-${option.name}-${idx}`}
              >
                <div className="flex items-center h-5 mr-3">
                  <input
                    checked={selected.includes(option.id)}
                    className="w-4 h-4 border-gray-300 rounded cursor-pointer text-primary-600 focus:ring-primary-500"
                    id={id || `option-${option.id}`}
                    name={name || `option-${option.id}`}
                    onChange={() => handleOnChange(option)}
                    type="checkbox"
                  />
                </div>
                <div className="flex-1 min-w-0 text-base">
                  <label
                    className="font-light text-gray-700 cursor-pointer select-none"
                    htmlFor={id || `option-${option.id}`}
                  >
                    {option.name}
                  </label>
                </div>
              </div>
            )
          )}

        {error && <p className="text-sm text-secondary-800">{error}</p>}
      </div>
    </fieldset>
  );
};

export default Checkbox;
