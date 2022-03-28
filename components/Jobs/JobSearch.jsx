function JobSearch() {
  return (
    <section className="flex flex-col items-center justify-center py-14">
      <h1 className="mb-8 text-3xl font-bold text-center text-accent-800">Looking for a job?</h1>
      <input
        className="w-full max-w-xl px-5 py-4 text-lg font-semibold text-gray-400 placeholder-gray-300 border-[3px] border-gray-100 rounded-full focus:outline-none focus:border-accent-400 shadow-md shadow-slate-100"
        placeholder="Search for a job"
        type="text"
      />
    </section>
  );
}

export default JobSearch;
