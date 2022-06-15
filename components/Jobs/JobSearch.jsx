import { useState } from 'react';
import { useDebounce } from 'react-use';

function JobSearch({ onSearch, loading }) {
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useDebounce(
    async () => {
      onSearch(search);
    },
    300,
    [search]
  );

  const Loader = () => (
    <svg
      role="status"
      className="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-accent-500"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  );

  return (
    <section className="flex flex-col items-center justify-center pt-8 pb-14">
      <h1 className="mb-8 text-2xl font-bold text-center text-accent-800">
        Find a place to work remotely
      </h1>
      <div className="relative flex items-center justify-center w-full max-w-lg mx-auto">
        <input
          id="search"
          name="search"
          type="text"
          placeholder="Search for a entry level jobs: skill or company"
          className="
            w-full max-w-lg px-4 py-4 text-gray-400 
            placeholder-gray-300 border-[2px] border-gray-100 
            rounded-3xl focus:outline-none focus:border-indigo-300 
            shadow-md shadow-slate-200 flex items-center justify-between
            pr-10 focus:ring-indigo-300  sm:text-base font-semibold transition-colors duration-100 ease-linear"
          onChange={handleChange}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          {loading && <Loader />}
        </div>
      </div>
    </section>
  );
}

export default JobSearch;
