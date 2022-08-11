import { getJobs } from '@/store/actions/jobAction';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Hero from '@/components/UI/Hero';
import JobCard from 'components/Jobs/JobCard';
import Loader from 'components/UI/Loader';

function JobsByCompany() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, jobs } = useSelector((state) => state.jobsList);
  const { company } = router.query;
  const companyCapitalize = company?.charAt(0)?.toUpperCase() + company?.slice(1);

  useEffect(() => {
    if (company) {
      dispatch(getJobs('companySlug', company));
    }
  }, [company, dispatch]);

  return (
    <section className="flex flex-col items-center justify-center mx-auto w-[96%]">
      <Head>
        <title>{`${companyCapitalize} Jobs`} | EntryLevelDevs</title>
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

export default JobsByCompany;
