import { getJobs } from '@/store/actions/jobAction';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import JobCard from '@/components/Jobs/JobCard';
import Hero from '@/components/UI/Hero';
import Loader from 'components/UI/Loader';

function JobsByTags() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, jobs } = useSelector((state) => state.jobsList);
  const { tag } = router.query;
  const tagCapitalize = tag?.charAt(0)?.toUpperCase() + tag?.slice(1);

  useEffect(() => {
    if (tag) {
      dispatch(getJobs('jobTags', tag));
    }
  }, [tag, dispatch]);

  return (
    <section className="flex flex-col items-center justify-center mx-auto w-[96%]">
      <Head>
        <title>{`${tagCapitalize} Jobs`} | EntryLevelDevs</title>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
      </Head>
      <Hero />
      <ul className="w-full space-y-5 max-w-hero">
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

export default JobsByTags;
