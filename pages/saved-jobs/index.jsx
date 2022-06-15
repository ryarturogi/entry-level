import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getSavedJobs } from '@/store/actions/savedJobsAction';
import { useUser } from '@/hooks/useAuthUser';
import JobsList from '@/components/Jobs/JobsList';
import Hero from '@/components/UI/Hero';

const SavedJobs = () => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const { loading, error, savedJobs } = useSelector((state) => state.savedJobs);

  const userID = user?.id || user?.uid;

  useEffect(() => {
    if (userID) {
      dispatch(getSavedJobs(userID));
    }
  }, [user]);

  return (
    <>
      <Hero title="Watchlist" subtitle="This is where you keep track of your saved jobs." />

      <JobsList jobs={savedJobs} error={error} loading={loading} />
    </>
  );
};

export default SavedJobs;
