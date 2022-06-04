import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import JobCard from '@/components/Job/JobCard';
import Head from '@/components/partials/Head';
import Loader from '@/components/UI/Loader';
import { getJob } from '@/store/actions/jobAction';

function Job() {
  const dispatch = useDispatch();
  const jobsList = useSelector((state) => state.jobsList);
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, job } = jobsList;

  useEffect(() => {
    if (id) {
      dispatch(getJob(id));
    }
  }, [id]);

  return (
    <>
      <Head title={`${job.jobTitle} Job`} />
      {(error && error.message) || (loading ? <Loader /> : <JobCard job={job} />)}
    </>
  );
}

export default Job;

export async function getServerSideProps() {
  return {
    props: {},
  };
}
