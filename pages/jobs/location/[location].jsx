import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JobCard from 'components/Jobs/JobCard';
import Loader from 'components/UI/Loader';
import { useRouter } from 'next/router';
import { getJobsByLocation } from '@/store/actions/jobAction';
import Head from 'next/head';

function JobType() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, jobs } = useSelector((state) => state.jobsList);
  const { location } = router.query;
  const locationCapitalize = location?.charAt(0)?.toUpperCase() + location?.slice(1);

  useEffect(() => {
    if (location) {
      dispatch(getJobsByLocation(location));
    }
  }, [location]);

  return (
    <section className="flex flex-col items-center justify-center mx-auto w-[96%]">
      <Head>
        <title>{`${locationCapitalize} Jobs`} | EntryLevelDevs</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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

export default JobType;
