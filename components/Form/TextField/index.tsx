import React from 'react';
import { NumericFormat } from 'react-number-format';
import { TextFieldProps } from './types';

const TextField: React.FC<TextFieldProps> = (props: TextFieldProps): React.ReactElement => {
  const { error, label, name, onBlur, onChange, required, type, value } = props;

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={name}>
          <div className="flex space-x-1.5 mb-1.5 text-base font-medium text-gray-700">
            <span dangerouslySetInnerHTML={{ __html: label }} />
            {required && (
              <span className="text-secondary-800" title={error}>
                *
              </span>
            )}
          </div>
        </label>
      )}
      {(name === 'jobSalary' && (
        <>
          <NumericFormat
            className={`w-full px-4 py-2.5 text-gray-700 bg-white border-2 border-primary-100 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary-600 font-light focus:border-transparent placeholder:text-sm ${
              error && 'border-secondary-800 placeholder:text-secondary-300'
            }`}
            displayType="input"
            onValueChange={(values) => {
              onChange({ target: { value: values.value } } as React.ChangeEvent<HTMLInputElement>);
            }}
            prefix="$"
            required={required || false}
            thousandSeparator=","
            valueIsNumericString
          />
        </>
      )) || (
        <input
          {...props}
          className={`w-full px-4 py-2.5 text-gray-700 bg-white border-2 border-primary-100 rounded-lg shadow-sm appearance-none font-light focus:outline-none focus:ring-2 focus:ring-primary-600 placeholder:text-sm focus:border-transparent ${
            error && 'border-secondary-800 placeholder:text-secondary-300'
          }`}
          onBlur={onBlur}
          onChange={onChange}
          required={required || false}
          title=" "
          type={type || 'text'}
          value={value}
        />
      )}
      {error && <small className="mt-2 text-sm text-secondary-800">{error}</small>}
    </div>
  );
};

export default TextField;
