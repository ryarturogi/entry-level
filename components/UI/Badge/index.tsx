import { BadgeProps } from './types';

const Badge: React.FC<BadgeProps> = (props: BadgeProps): React.ReactElement => {
  const { children, className = '' } = props;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md capitalize text-xs font-medium bg-primary-100 text-primary-800 ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
