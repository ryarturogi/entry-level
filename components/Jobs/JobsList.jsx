import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '@/components/UI/Loader';
import { getJobs } from '@/store/actions/jobAction';

import JobCard from './JobCard';

function JobsList() {
  const dispatch = useDispatch();
  const jobsList = useSelector((state) => state.jobsList);
  const { loading, error, jobs } = jobsList;

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  return (
    <section className="flex flex-col items-center justify-center mx-auto w-[96%]">
      <ul className="w-full space-y-5 max-w-hero">
        {error && error.message}
        {(loading && !error && (
          <li className="flex items-center justify-center w-full ">
            <Loader />
          </li>
        )) ||
          jobs.map((job) => <JobCard job={job} key={job.id} />)}
      </ul>
    </section>
  );
}

export default JobsList;
