import Loader from '../UI/Loader';
import JobCard from './JobCard';

function JobsList({ loading, error, jobs }) {
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="flex flex-col items-center justify-center mx-auto w-[96%]">
      {jobs?.length > 0 && (
        <ul className="flex flex-col items-center justify-center w-full space-y-4 max-w-hero">
          {jobs?.map((job, idx) => {
            return (
              <li className="w-full" key={idx}>
                <JobCard job={job} />
              </li>
            );
          })}
        </ul>
      )}
      {jobs?.length === 0 && <div className="text-2xl font-bold text-gray-600">No jobs found</div>}
    </section>
  );
}

export default JobsList;
