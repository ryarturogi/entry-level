import PropTypes from 'prop-types';
import { useState } from 'react';

const JobsSortBy = ({ onChange }) => {
  const [sortBy, setSortBy] = useState('newest');

  const handleOnChange = (e) => {
    setSortBy(e.target.value);
    onChange({ sortBy: e.target.value });
  };

  return (
    <div>
      <span className="mr-2 text-base font-semibold text-gray-900">Sort by:</span>
      <button
        className={`px-2 py-1 text-base rounded-md ${
          sortBy === 'newest' ? 'text-primary-600' : 'text-gray-800'
        }`}
        onClick={handleOnChange}
        value="newest"
      >
        Newest
      </button>
      <button
        className={`px-2 py-1 text-base rounded-md ${
          sortBy === 'oldest' ? 'text-primary-600' : 'text-gray-800'
        }`}
        onClick={handleOnChange}
        value="oldest"
      >
        Oldest
      </button>
    </div>
  );
};

JobsSortBy.propTypes = {
  onChange: PropTypes.func,
};

export default JobsSortBy;
