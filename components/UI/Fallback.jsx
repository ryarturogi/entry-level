import { ArrowPathIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

function Fallback({ message }) {
  return (
    <div className="flex items-center h-full pt-2 pb-5">
      <ArrowPathIcon className="w-5 h-5 text-primary-400 animate-spin" />
      <span className="ml-3 text-sm text-gray-600">{message ? message : 'Loading...'}</span>
    </div>
  );
}

Fallback.propTypes = {
  message: PropTypes.string,
};

export default Fallback;
