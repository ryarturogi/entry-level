import Loader from '@/components/UI/Loader';
import JobCard from './JobCard';

function JobsList({ loading, error, jobs }) {
  return (
    <section className="flex flex-col items-center justify-center mx-auto w-[96%]">
      <ul className="flex flex-col items-center justify-center w-full space-y-4 max-w-hero">
        {loading && !error && (
          <li className="z-50 flex items-center justify-center w-full">
            <Loader />
          </li>
        )}
        {jobs?.length > 0
          ? jobs.map((job) => <JobCard job={job} key={job.id} />)
          : !loading &&
            !error && <div className="text-2xl font-bold text-gray-600">No jobs found</div>}
      </ul>
    </section>
  );
}

export default JobsList;
