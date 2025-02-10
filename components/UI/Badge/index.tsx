import { BadgeProps } from './types';
import { COLOR_MAP } from '../Button/constants';

const SIZES_MAP = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

const ROUNDED_MAP = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
};

const Badge: React.FC<BadgeProps> = (props: BadgeProps): React.ReactElement => {
  const { children, className = '', variant, size, rounded } = props;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 capitalize font-medium ${className} ${
        COLOR_MAP[variant || 'primary']
      } ${SIZES_MAP[size || 'md']} ${ROUNDED_MAP[rounded || 'md']}`}
    >
      {children}
    </span>
  );
};

export default Badge;
