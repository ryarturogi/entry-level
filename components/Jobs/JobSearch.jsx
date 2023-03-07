import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Loader from '../UI/Loader';

const JobSearch = ({ onSearch, loading }) => {
  const [search, setSearch] = useState('');
  let timeoutId = null;

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      onSearch(search);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [search, onSearch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="flex flex-col items-center justify-center pt-8 pb-14">
      <h1 className="mb-8 text-2xl font-bold text-center text-primary-800">
        Find a place to work remotely
      </h1>
      <div className="relative flex items-center justify-center w-full max-w-lg mx-auto">
        <input
          className="
            w-full max-w-lg px-4 py-4 text-gray-400 
            placeholder-gray-300 border-[2px] border-gray-100 
            rounded-3xl focus:outline-none focus:border-indigo-300 
            shadow-md shadow-slate-200 flex items-center justify-between
            pr-10 focus:ring-indigo-300  sm:text-base font-semibold transition-colors duration-100 ease-linear"
          id="search"
          name="search"
          onChange={handleChange}
          placeholder="Search for a entry level jobs: skill or company"
          type="text"
        />
      </div>
    </section>
  );
};

JobSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default JobSearch;
