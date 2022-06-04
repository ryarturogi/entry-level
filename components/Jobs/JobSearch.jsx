import { useState } from 'react';
import { useDebounce } from 'react-use';

function JobSearch({ onSearch }) {
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useDebounce(
    () => {
      onSearch(search);
    },
    300,
    [search]
  );

  return (
    <section className="flex flex-col items-center justify-center py-14">
      <h1 className="mb-8 text-3xl font-bold text-center text-accent-800">Looking for a job?</h1>
      <input
        className="w-full max-w-xl px-5 py-4 text-lg font-semibold text-gray-400 placeholder-gray-300 border-[3px] border-gray-100 rounded-full focus:outline-none focus:border-accent-400 shadow-md shadow-slate-100"
        placeholder="Search for a job"
        type="text"
        value={search}
        onChange={handleChange}
      />
    </section>
  );
}

export default JobSearch;
