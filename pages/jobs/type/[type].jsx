import { getJobs } from '@/store/actions/jobAction';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import JobCard from '@/components/Jobs/JobCard';
import Hero from '@/components/UI/Hero';
import Loader from 'components/UI/Loader';

function JobsByType() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, jobs } = useSelector((state) => state.jobsList);
  const { type } = router.query;
  const typeCapitalize = type?.charAt(0)?.toUpperCase() + type?.slice(1);

  useEffect(() => {
    if (type) {
      dispatch(getJobs('jobType', type));
    }
  }, [type, dispatch]);

  return (
    <section className="flex flex-col items-center justify-center mx-auto max-w-8xl">
      <Head>
        <title>{`${typeCapitalize} Jobs`} | EntryLevelDevs</title>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
      </Head>
      <Hero title={`${typeCapitalize} Jobs`} />
      <ul className="w-full space-y-5 max-w-8xl">
        {error && error.message}
        {(loading && !error && (
          <li className="flex items-center justify-center w-full ">
            <Loader />
          </li>
        )) ||
          (jobs ? jobs.map((job) => <JobCard job={job} key={job.id} />) : null)}
      </ul>
    </section>
  );
}

export default JobsByType;
