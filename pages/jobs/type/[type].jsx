import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getJobsByType } from '@/store/actions/jobAction';
import Head from 'next/head';

import Loader from 'components/UI/Loader';
import Hero from '@/components/UI/Hero';
import JobCard from 'components/Jobs/JobCard';

function JobsByType() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, jobs } = useSelector((state) => state.jobsList);
  const { type } = router.query;
  const typeCapitalize = type?.charAt(0)?.toUpperCase() + type?.slice(1);

  useEffect(() => {
    if (type) {
      dispatch(getJobsByType(type));
    }
  }, [type]);

  return (
    <section className="flex flex-col items-center justify-center mx-auto w-[96%]">
      <Head>
        <title>{`${typeCapitalize} Jobs`} | EntryLevelDevs</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Hero />
      <ul className="w-full space-y-5 max-w-hero">
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
