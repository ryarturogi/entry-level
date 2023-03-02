import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';

const TextField = (props) => {
  return (
    <div className="w-full">
      {props.label && (
        <label htmlFor={props.name}>
          <div className="flex space-x-1.5 mb-1.5 text-base font-medium text-gray-700">
            <span>{props.label}</span>
            {props.required && <span className="text-secondary-800">*</span>}
          </div>
        </label>
      )}
      {(props.name === 'jobSalary' && (
        <>
          <NumericFormat
            {...props}
            className={`w-full px-4 py-2.5 text-gray-700 bg-white border-2 border-primary-100 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent ${
              props.error && 'border-secondary-800'
            } ${props.success && 'border-primary-500'}`}
            displayType="input"
            onValueChange={(values) => {
              props.onChange(values.value);
            }}
            prefix="$"
            thousandSeparator=","
            valueIsNumericString={true}
          />
        </>
      )) || (
        <input
          {...props}
          className={`w-full px-4 py-2.5 text-gray-700 bg-white border-2 border-primary-100 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent ${
            props.error && 'border-secondary-800'
          } ${props.success && 'border-primary-500'}`}
          onBlur={props.onBlur}
          onChange={props.onChange}
          type="text"
          value={props.value}
        />
      )}
      {props.error && <p className="mt-2 text-sm text-secondary-800">{props.error}</p>}
    </div>
  );
};

TextField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  success: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
};

export default TextField;
