import PropTypes from 'prop-types';
import Loader from '../UI/Loader';
import JobCard from './JobCard';

function JobsList({ loading, error, jobs }) {
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="relative flex flex-col items-center justify-center col-span-12 mx-auto max-w-8xl sm:col-span-8">
      <ul className="grid w-full grid-cols-1 gap-5">
        {jobs?.length > 0 &&
          jobs.map((job) => {
            return (
              <li className="w-full" key={job.id}>
                <JobCard job={job} />
              </li>
            );
          })}
      </ul>
      {jobs?.length === 0 && <div className="text-2xl font-bold text-gray-600">No jobs found</div>}
      {loading && <Loader />}
    </section>
  );
}

JobsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  jobs: PropTypes.array,
};

export default JobsList;
