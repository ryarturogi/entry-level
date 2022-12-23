import { useUser } from '@/hooks/useAuthUser';
import { getJobs, searchJobs } from '@/store/actions/jobAction';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSavedJobs } from '@/store/actions/savedJobsAction';
import 'react-toastify/dist/ReactToastify.css';

import JobSearch from '@/components/Jobs/JobSearch';
import JobsList from '@/components/Jobs/JobsList';
import Head from '@/components/partials/Head';
import Hero from '@/components/UI/Hero';

function Home() {
  const dispatch = useDispatch();
  const { user } = useUser();
  const { loading, error, jobs } = useSelector((state) => state.jobsList);

  const handleOnSearch = (search) => {
    if (search.length > 2) {
      dispatch(searchJobs(search));
    } else {
      dispatch(getJobs());
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(getSavedJobs());
    }
  }, [user, dispatch]);

  return (
    <div className="min-h-screen mb-20">
      <Head />
      <Hero
        action={{
          handler: handleOnSearch,
        }}
      ></Hero>

      <JobSearch loading={loading} onSearch={handleOnSearch} />
      <JobsList error={error} jobs={jobs} loading={loading} />
    </div>
  );
}

export default Home;
