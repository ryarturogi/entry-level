import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from '@/hooks/useAuthUser';

import 'react-toastify/dist/ReactToastify.css';
import { getSavedJobs } from '@/store/actions/savedJobsAction';

import Hero from '@/components/UI/Hero';
import JobsList from '@/components/Jobs/JobsList';
import Head from '@/components/partials/Head';

function SavedJobs() {
  const dispatch = useDispatch();
  const { user } = useUser();
  const { loading, error, savedJobs } = useSelector((state) => state.savedJobs);

  useEffect(() => {
    if (user) {
      dispatch(getSavedJobs());
    }
  }, [user]);

  return (
    <div className="min-h-screen mb-20">
      <Head />
      <Hero title="Saved Jobs" subtitle="Saved jobs are stored here." />

      <JobsList jobs={savedJobs} error={error} loading={loading} />
    </div>
  );
}

export default SavedJobs;
