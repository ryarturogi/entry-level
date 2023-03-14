import PropTypes from 'prop-types';

const COLOR_MAP = {
  primary:
    'bg-primary-700 hover:bg-primary-800 active:ring-primary-600  active:outline-none active:bg-primary-600 text-white',
  secondary:
    'bg-secondary-500 hover:bg-primary-700 active:ring-primary-600  active:outline-none active:bg-primary-600 text-white',
  success:
    'bg-success hover:bg-primary-700 active:ring-primary-600  active:outline-none active:bg-primary-600 text-white',
  danger: 'bg-error-200 hover:bg-error-300 text-error-700',
  warning: 'bg-warning hover:bg-orange-700 text-white',
  info: 'bg-info hover:bg-primary-800 active:ring-primary-600  active:outline-none active:bg-primary-600 text-white',
  link: 'bg-transparent text-gray-800 hover:text-primary-500 hover:bg-gray-200',
  disabled: 'bg-gray-200 text-gray-500 cursor-not-allowed',
  white:
    'bg-white text-gray-800 hover:text-secondary-700 hover:bg-secondary-700 border-2 border-primary-100 hover:border-secondary-700 active:ring-secondary-500  active:outline-none active:bg-secondary-900 hover:text-white',
  gray: 'bg-gray-200 text-gray-800 hover:text-primary-500 hover:bg-gray-300',
  dark: 'text-white bg-gray-800 hover:bg-primary-800 active:ring-primary-600  active:outline-none active:bg-primary-600 text-white',
  transparent: 'bg-transparent text-gray-800 hover:text-primary-500 hover:bg-gray-200',
};

const SIZE_MAP = {
  sm: 'text-sm py-1 px-2',
  md: 'text-base py-2.5 px-6',
  lg: 'text-lg py-3 px-8',
};

const ROUNDED_MAP = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
};

const DISPLAY_TYPE_MAP = {
  'block w-full': 'block',
  inline: 'inline-block',
  'flex w-full': 'flex',
  'inline-flex': 'inline-flex',
};

const ICON_SIZE_MAP = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

const Button = (props) => {
  const {
    color = 'primary',
    size = 'md',
    icon,
    iconSize = 'md',
    iconPosition = 'left',
    rounded = '',
    displayType = 'inline-block w-full',
    children,
    styles,
    fullWidth = false,
    ...rest
  } = props;

  const colorClass = COLOR_MAP[color] || COLOR_MAP.primary;
  const sizeClass = SIZE_MAP[size] || SIZE_MAP.md;
  const roundedClass = ROUNDED_MAP[rounded] || '';
  const displayTypeClass = DISPLAY_TYPE_MAP[displayType] || DISPLAY_TYPE_MAP['inline-block w-full'];
  const iconSizeClass = ICON_SIZE_MAP[iconSize] || ICON_SIZE_MAP.md;

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
      `}
      {...rest}
      type="button"
    >
      <span>{icon && iconPosition === 'left' && <i className={`${iconSizeClass}`}>{icon}</i>}</span>
      <span>{children}</span>
      <span>
        {icon && iconPosition === 'right' && <i className={`${iconSizeClass}`}>{icon}</i>}
      </span>
    </button>
  );
};

Button.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.node,
  iconSize: PropTypes.string,
  iconPosition: PropTypes.string,
  rounded: PropTypes.string,
  displayType: PropTypes.string,
  children: PropTypes.node,
  styles: PropTypes.string,
  fullWidth: PropTypes.bool,
};

export default Button;
