import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getJobsByCategory } from '@/store/actions/jobAction';
import Head from 'next/head';

import JobCard from 'components/Jobs/JobCard';
import Loader from 'components/UI/Loader';
import Hero from '@/components/UI/Hero';

function JobsByCategory() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, jobs } = useSelector((state) => state.jobsList);
  const { category } = router.query;
  const categoryCapitalize = category?.charAt(0)?.toUpperCase() + category?.slice(1) || '';

  useEffect(() => {
    if (category) {
      dispatch(getJobsByCategory(category));
    }
  }, [category]);

  return (
    <section className="flex flex-col items-center justify-center mx-auto w-[96%]">
      <Head>
        <title>{`${categoryCapitalize} Category`} | EntryLevelDevs</title>
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
          (jobs ? jobs.map((job, idx) => <JobCard job={job} key={idx} />) : null)}
      </ul>
    </section>
  );
}

export default JobsByCategory;
