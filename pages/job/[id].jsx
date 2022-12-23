import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import JobCard from '@/components/Job/JobCard';
import Head from '@/components/partials/Head';
import Loader from '@/components/UI/Loader';
import { getJob } from '@/store/actions/jobAction';

function Job() {
  const dispatch = useDispatch();
  const { loading, error, job } = useSelector((state) => state.jobsList);
  const router = useRouter();
  // Set default value for id to an empty string
  const { id = '' } = router.query;

  useEffect(() => {
    if (id) {
      dispatch(getJob(id));
    }
  }, [id, dispatch]);

  return (
    <>
      {job && <Head title={`${job.jobTitle} Job`} />}
      {error && error.message}
      {loading ? <Loader /> : job ? <JobCard job={job} /> : null}
    </>
  );
}

export default Job;

export async function getServerSideProps() {
  return {
    props: {},
  };
}
