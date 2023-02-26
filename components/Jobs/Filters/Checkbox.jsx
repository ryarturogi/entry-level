import PropTypes from 'prop-types';
import { useState } from 'react';

export default function Checkbox({ options, optionsSelected, title = 'others', onChange }) {
  const [optionsList, setOptionsList] = useState(options);
  const [selected, setSelected] = useState(optionsSelected);

  const handleOnChange = (id) => {
    const isSelected = selected.includes(id);
    const newSelected = isSelected
      ? selected.filter((selectedId) => selectedId !== id)
      : [...selected, id];
    setSelected(newSelected);
    const newOptions = optionsList.map((option) => {
      if (option.id === id) {
        return { ...option, selected: !isSelected };
      }
      return option;
    });
    setOptionsList(newOptions);
    onChange(newOptions);
  };

  return (
    <fieldset className="mt-5">
      <legend className="text-base font-semibold leading-6 text-gray-900">{title}</legend>
      <div className="mt-4">
        {optionsList?.length > 0 &&
          optionsList.map((option) => (
            <div className="relative flex items-start py-2.5" key={option.id}>
              <div className="flex items-center h-5 mr-3">
                <input
                  checked={selected.includes(option.id)}
                  className="w-4 h-4 border-gray-300 rounded cursor-pointer text-primary-600 focus:ring-primary-500"
                  id={`option-${option.id}`}
                  name={`option-${option.id}`}
                  onChange={() => handleOnChange(option.id)}
                  type="checkbox"
                />
              </div>
              <div className="flex-1 min-w-0 text-sm">
                <label
                  className="font-medium text-gray-700 cursor-pointer select-none"
                  htmlFor={`option-${option.id}`}
                >
                  {option.name}
                </label>
              </div>
            </div>
          ))}
      </div>
    </fieldset>
  );
}

Checkbox.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  optionsSelected: PropTypes.array,
  title: PropTypes.string,
  onChange: PropTypes.func,
};
