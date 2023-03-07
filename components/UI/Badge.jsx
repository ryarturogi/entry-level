import PropTypes from 'prop-types';

const Badge = ({ children, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md capitalize text-xs font-medium bg-primary-100 text-primary-800 ${className}`}
    >
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Badge;
