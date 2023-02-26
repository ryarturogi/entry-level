import { getJobs } from '@/store/actions/jobAction';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import JobCard from '@/components/Jobs/JobCard';
import Hero from '@/components/UI/Hero';
import Loader from 'components/UI/Loader';

function JobsByLocation() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, jobs } = useSelector((state) => state.jobsList);
  const { location } = router.query;
  const locationCapitalize = location?.charAt(0)?.toUpperCase() + location?.slice(1);

  useEffect(() => {
    if (location) {
      dispatch(getJobs('location', location));
    }
  }, [location, dispatch]);

  return (
    <section className="flex flex-col items-center justify-center mx-auto max-w-8xl">
      <Head>
        <title>{`${locationCapitalize} Jobs`} | EntryLevelDevs</title>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
      </Head>
      <Hero title={`Jobs listing at ${locationCapitalize} `} />
      <ul className="w-full space-y-5 max-w-8xl">
        {error && error.message}
        {(loading && !error && (
          <li className="flex items-center justify-center w-full ">
            <Loader />
          </li>
        )) ||
          (jobs ? jobs.map((job, idx) => <JobCard job={job} key={idx} />) : null)}
      </ul>
    </section>
  );
}

export default JobsByLocation;
