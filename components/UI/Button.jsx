function Button(props) {
  const {
    color,
    size,
    icon,
    iconSize,
    iconPosition = 'left',
    rounded,
    displayType,
    children,
    ...rest
  } = props;

  const setColor = () => {
    switch (color) {
      case 'primary':
        return 'bg-accent-500 hover:bg-accent-800';
      case 'secondary':
        return 'bg-accent-100 hover:bg-gray-500';
      case 'success':
        return 'bg-notice-success hover:bg-green-700';
      case 'danger':
        return 'bg-notice-danger-200 hover:bg-notice-danger-300';
      case 'warning':
        return 'bg-orange-500 hover:bg-orange-700';
      case 'info':
        return 'bg-notice-info hover:bg-accent-800';
      default:
        return 'bg-accent-500 hover:bg-accent-800';
    }
  };

  const setSize = () => {
    switch (size) {
      case 'sm':
        return 'text-sm py-1 px-2';
      case 'md':
        return 'text-base py-2.5 px-6';
      case 'lg':
        return 'text-lg py-3 px-8';
      default:
        return 'text-base py-3.5 px-6';
    }
  };

  const setRounded = () => {
    switch (rounded) {
      case 'sm':
        return 'rounded-sm';
      case 'md':
        return 'rounded-md';
      case 'lg':
        return 'rounded-lg';
      default:
        return 'rounded';
    }
  };

  const setDisplayType = () => {
    switch (displayType) {
      case 'block w-full':
        return 'block';
      case 'inline':
        return 'inline-block';
      case 'flex w-full':
        return 'flex';
      case 'inline-flex':
        return 'inline-flex';
      default:
        return 'inline-block w-full';
    }
  };

  const setIconSize = () => {
    switch (iconSize) {
      case 'sm':
        return 'w-4 h-4';
      case 'md':
        return 'w-6 h-6';
      case 'lg':
        return 'w-8 h-8';
      default:
        return 'w-6 h-6';
    }
  };

  return (
    <button
      className={`
        text-white font-semibold flex items-center justify-center
        ${setDisplayType(displayType)} 
        ${setRounded(rounded)} 
        ${setColor(color)} 
        ${setSize(size)}
      `}
      type="button"
      {...rest}
    >
      {icon && iconPosition === 'left' && <i className={`${setIconSize(iconSize)} mr-1`}>{icon}</i>}
      {children}
      {icon && iconPosition === 'right' && (
        <i className={`${setIconSize(iconSize)} ml-1`}>{icon}</i>
      )}
    </button>
  );
}

export default Button;
