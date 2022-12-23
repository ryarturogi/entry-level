import { useUser } from '@/hooks/useAuthUser';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSavedJobs } from '@/store/actions/savedJobsAction';
import 'react-toastify/dist/ReactToastify.css';

import JobsList from '@/components/Jobs/JobsList';
import Head from '@/components/partials/Head';
import Hero from '@/components/UI/Hero';

function SavedJobs() {
  const dispatch = useDispatch();
  const { user } = useUser();
  const { loading, error, savedJobs } = useSelector((state) => state.savedJobs);

  useEffect(() => {
    if (user) {
      dispatch(getSavedJobs());
    }
  }, [user, dispatch]);

  return (
    <div className="min-h-screen mb-20">
      <Head />
      <Hero subtitle="Saved jobs are stored here." title="Saved Jobs" />
      <JobsList error={error} jobs={savedJobs || []} loading={loading} />
    </div>
  );
}

export default SavedJobs;
