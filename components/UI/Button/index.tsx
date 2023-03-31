import { COLOR_MAP, DISPLAY_TYPE_MAP, ROUNDED_MAP, SIZE_MAP } from './constants';
import { ButtonProps } from './types';

const Button: React.FC<ButtonProps> = (props: ButtonProps): React.ReactElement => {
  const {
    color = 'primary',
    size = 'md',
    rounded,
    displayType = 'inline-block w-full',
    children,
    styles,
    fullWidth = false,
    className,
    ...rest
  } = props;

  const colorClass = COLOR_MAP[color] || COLOR_MAP.primary;
  const sizeClass = SIZE_MAP[size] || SIZE_MAP.md;
  const roundedClass = ROUNDED_MAP[rounded] || '';
  const displayTypeClass = DISPLAY_TYPE_MAP[displayType] || DISPLAY_TYPE_MAP['block w-full'];

  return (
    <button
      className={`
        flex items-center justify-center space-x-1
        transition-colors duration-200 ease-in-out
        ${displayTypeClass}
        ${roundedClass}
        ${colorClass}
        ${sizeClass}
        ${styles}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...rest}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
