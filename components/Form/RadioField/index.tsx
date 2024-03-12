import { RadioFieldProps } from './types';
import { COLOR_MAP } from '@/components/UI/Loader/constants';

const RadioField: React.FC<RadioFieldProps> = ({
  options,
  optionSelected,
  title,
  variant = 'primary',
  onChange,
}: RadioFieldProps): React.ReactElement => {
  return (
    <fieldset>
      <legend className="text-base font-semibold leading-6 text-gray-900">{title}</legend>
      <div className="mt-2">
        {options.map((type) => (
          <div className="relative flex items-center py-1.5" key={type.id}>
            <div className="flex items-center h-5 mr-3">
              <input
                checked={optionSelected === type.id}
                className={`w-4 h-4 border-gray-300 cursor-pointer text-${COLOR_MAP[variant]} ring-2 ring-${COLOR_MAP[variant]} checked:ring-${COLOR_MAP[variant]} checked:ring-1 focus:ring-2 focus:ring-${COLOR_MAP[variant]} focus:ring-offset-2 focus:ring-offset-white`}
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
                // className="font-light text-gray-700 cursor-pointer select-none"
                className={`font-light cursor-pointer select-none ${
                  optionSelected === type.id ? `text-${COLOR_MAP[variant]}` : 'text-gray-700'
                }`}
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

export default RadioField;
