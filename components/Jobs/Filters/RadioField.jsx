import PropTypes from 'prop-types';

const RadioField = ({ options, optionSelected, title, onChange }) => {
  return (
    <fieldset>
      <legend className="text-base font-semibold leading-6 text-gray-900">{title}</legend>
      <div className="mt-2">
        {options.map((type) => (
          <div className="relative flex items-center py-1.5" key={type.id}>
            <div className="flex items-center h-5 mr-3">
              <input
                checked={optionSelected === type.id}
                className="w-4 h-4 border-gray-300 cursor-pointer text-primary-600 ring-2 ring-primary-200 checked:ring-primary-600 checked:ring-1 focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 focus:ring-offset-white"
                id={`type-${type.id}`}
                name="plan"
                onChange={() => {
                  onChange(type.id);
                }}
                type="radio"
              />
            </div>
            <div className="flex-1 min-w-0 text-base">
              <label
                className="font-light text-gray-700 cursor-pointer select-none"
                htmlFor={`type-${type.id}`}
              >
                {type.name}
              </label>
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
};

RadioField.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  optionSelected: PropTypes.string,
  title: PropTypes.string,
  onChange: PropTypes.func,
};

export default RadioField;
