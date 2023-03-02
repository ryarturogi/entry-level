import PropTypes from 'prop-types';
import { useState } from 'react';

const Checkbox = ({ options, optionsSelected, title, onChange, id, name, error }) => {
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
    <fieldset>
      {title && (
        <legend className="text-base font-semibold leading-6 text-gray-900">{title}</legend>
      )}

      <div className={title ? 'mt-4' : ''}>
        {optionsList?.length > 0 &&
          optionsList.map((option) => (
            <div className="relative flex items-start py-2" key={option.id}>
              <div className="flex items-center h-5 mr-3">
                <input
                  checked={selected.includes(option.id)}
                  className="w-4 h-4 border-gray-300 rounded cursor-pointer text-primary-600 focus:ring-primary-500"
                  id={id || `option-${option.id}`}
                  name={name || `option-${option.id}`}
                  onChange={() => handleOnChange(option.id)}
                  type="checkbox"
                />
              </div>
              <div className="flex-1 min-w-0 text-base">
                <label
                  className="font-medium text-gray-700 cursor-pointer select-none"
                  htmlFor={id || `option-${option.id}`}
                >
                  {option.name}
                </label>
              </div>
            </div>
          ))}

        {error && <p className="text-sm text-secondary-800">{error}</p>}
      </div>
    </fieldset>
  );
};

Checkbox.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  optionsSelected: PropTypes.oneOfType([PropTypes.bool, PropTypes.arrayOf(PropTypes.string)]),
  title: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  success: PropTypes.string,
};

export default Checkbox;
