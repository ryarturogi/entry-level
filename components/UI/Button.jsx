import PropTypes from 'prop-types';

const COLOR_MAP = {
  primary: 'bg-primary-500 hover:bg-primary-800',
  secondary: 'bg-primary-100 hover:bg-gray-500',
  success: 'bg-success hover:bg-primary-700',
  danger: 'bg-error-200 hover:bg-error-300',
  warning: 'bg-warning hover:bg-orange-700',
  info: 'bg-info hover:bg-primary-800',
  link: 'bg-transparent text-gray-800 hover:text-primary-500',
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

function Button(props) {
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
        text-white font-semibold flex items-center justify-center
        ${displayTypeClass}
        ${roundedClass}
        ${colorClass}
        ${sizeClass}
        ${styles}
      `}
      type="button"
      {...rest}
    >
      {icon && iconPosition === 'left' && <i className={`${iconSizeClass} mr-1`}>{icon}</i>}
      {children}
      {icon && iconPosition === 'right' && <i className={`${iconSizeClass} ml-1`}>{icon}</i>}
    </button>
  );
}

export default Button;

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
};
