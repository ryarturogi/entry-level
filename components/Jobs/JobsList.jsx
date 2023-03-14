import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Loader from '../UI/Loader';
import JobCardItem from './JobsItem';

const JobsList = ({ loading, error, jobs }) => {
  const [currentLoading, setCurrentLoading] = useState(loading);

  useEffect(() => {
    setTimeout(() => {
      setCurrentLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    setCurrentLoading(true);

    setTimeout(() => {
      setCurrentLoading(false);
    }, 500);
  }, [loading]);

  if (currentLoading) {
    return (
      <div className="relative flex flex-col items-center w-full h-full top-20">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>{error?.message || error}</div>;
  }

  if (!error && jobs?.length === 0 && !currentLoading) {
    return (
      <ul className="grid w-full grid-cols-1 gap-5">
        <li className="w-full list-none">
          <div className="flex flex-col items-center justify-center p-5 space-y-5 text-center bg-white border border-gray-200 rounded-md shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-700">No jobs found</h3>
            <p className="text-base font-light text-gray-500">
              We couldn&apos;t find any jobs matching your search.
            </p>
          </div>
        </li>
      </ul>
    );
  }

  return (
    <section className="relative flex flex-col items-center justify-center col-span-12 mx-auto max-w-8xl sm:col-span-8">
      <ul className="grid w-full grid-cols-1 gap-5 h-fit">
        {jobs?.length > 0 &&
          jobs.map((job) => {
            return (
              <li className="w-full" key={job.id}>
                <JobCardItem job={job} />
              </li>
            );
          })}
      </ul>
    </section>
  );
};

JobsList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      company: PropTypes.string,
      location: PropTypes.string,
      type: PropTypes.string,
      description: PropTypes.string,
      companyLogo: PropTypes.string,
      companySlug: PropTypes.string,
      jobSlug: PropTypes.string,
    })
  ),
};

export default JobsList;
