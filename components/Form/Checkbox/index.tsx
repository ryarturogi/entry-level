import React, { ChangeEvent, FC, useState } from 'react';
import { OptionItem } from '@/types';

interface CheckboxProps {
  options: OptionItem[];
  optionsSelected: OptionItem[];
  title?: string;
  id?: string;
  name?: string;
  error?: string;
  multiple?: boolean;
  onChange: (options: OptionItem[]) => void;
}

const Checkbox: FC<CheckboxProps> = ({
  options,
  optionsSelected,
  title,
  onChange,
  id = 'checkbox',
  name = 'checkbox',
  error,
  multiple,
}) => {
  const [optionsList, setOptionsList] = useState<OptionItem[]>(options);
  const [selected, setSelected] = useState<OptionItem[]>(optionsSelected);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>, id: string | number) => {
    const isChecked = event.target.checked;
    const updatedSelected = isChecked
      ? [...selected, { id, name: event.target.name }]
      : selected.filter((option) => option.id !== id);
    setSelected(updatedSelected);

    const updatedOptions = optionsList.map((option) => {
      if (option.id === id) {
        return { ...option, selected: isChecked };
      }
      return option;
    });
    setOptionsList(updatedOptions);

    onChange(updatedOptions);
  };

  return (
    <fieldset>
      {title && (
        <legend className="text-base font-semibold leading-6 text-gray-900">{title}</legend>
      )}

      <div className={title ? 'mt-2' : ''}>
        {optionsList?.length > 0 &&
          optionsList.map(({ id: optionId, name: optionName }) => (
            <div className="relative flex items-center py-1.5" key={`option-${optionId}`}>
              <div className="flex items-center h-5 mr-3">
                <input
                  checked={selected.some((option) => option.id === optionId)}
                  className="w-4 h-4 border-gray-300 rounded cursor-pointer text-primary-600 focus:ring-primary-500"
                  id={`${id}-${optionId}`}
                  multiple={multiple}
                  name={name}
                  onChange={(event) => handleOnChange(event, optionId)}
                  type="checkbox"
                />
              </div>
              <div className="flex-1 min-w-0 text-base">
                <label
                  className="font-light text-gray-700 cursor-pointer select-none"
                  htmlFor={`${id}-${optionId}`}
                >
                  {optionName}
                </label>
              </div>
            </div>
          ))}

        {error && <p className="text-sm text-secondary-800">{error}</p>}
      </div>
    </fieldset>
  );
};

export default Checkbox;
