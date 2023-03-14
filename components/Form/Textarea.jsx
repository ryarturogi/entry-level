import PropTypes from 'prop-types';

const TextareaField = (props) => {
  const { error, label, name, onBlur, onChange, required, rows, success, value } = props;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name}>
          <div className="flex space-x-1.5 mb-1.5 text-base font-medium text-gray-700">
            <span>{label}</span>
            {required && (
              <span className="text-secondary-800" title={error}>
                *
              </span>
            )}
          </div>
        </label>
      )}
      <textarea
        {...props}
        className={`w-full px-4 py-2.5 text-gray-700 bg-white border-2 border-primary-100 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent ${
          error && 'border-secondary-800'
        } ${success && 'border-primary-500'}`}
        onBlur={onBlur}
        onChange={onChange}
        rows={rows}
        value={value}
      />

      {error && <p className="mt-2 text-sm text-secondary-800">{error}</p>}
    </div>
  );
};

TextareaField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  success: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.number,
};

export default TextareaField;
