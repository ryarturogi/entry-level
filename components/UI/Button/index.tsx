import { COLOR_MAP, DISPLAY_TYPE_MAP, ICON_SIZE_MAP, ROUNDED_MAP, SIZE_MAP } from './constants';
import { ButtonProps } from './types';

const Button: React.FC<ButtonProps> = (props: ButtonProps): React.ReactElement => {
  const {
    color = 'primary',
    size = 'md',
    icon = null,
    iconSize = 'md',
    iconPosition = 'left',
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
        ${className}
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

export default Button;
