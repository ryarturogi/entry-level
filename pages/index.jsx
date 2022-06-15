import { useEffect } from 'react';
import { searchJobs, getJobs } from '@/store/actions/jobAction';
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from '@/hooks/useAuthUser';

import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { getSavedJobs } from '@/store/actions/savedJobsAction';

import Hero from '@/components/UI/Hero';
import JobSearch from '@/components/Jobs/JobSearch';
import JobsList from '@/components/Jobs/JobsList';
import Head from '@/components/partials/Head';

function Home() {
  const dispatch = useDispatch();
  const { user } = useUser();
  const { loading, error, jobs } = useSelector((state) => state.jobsList);

  const handleOnSearch = (search) => {
    if (search.length > 2) {
      return dispatch(searchJobs(search));
    }
    return dispatch(getJobs());
  };

  useEffect(() => {
    if (user) {
      dispatch(getSavedJobs());
    }
  }, [user]);

  return (
    <div className="min-h-screen mb-20">
      <Head />
      <Hero
        action={{
          handler: handleOnSearch,
        }}
      ></Hero>

      <JobSearch onSearch={handleOnSearch} loading={loading} />
      <JobsList jobs={jobs} error={error} loading={loading} />
      <ToastContainer
        autoClose={1800}
        closeOnClick
        hideProgressBar
        limit={10}
        pauseOnHover
        className="text-base"
        position={toast.POSITION.BOTTOM_RIGHT}
        role="alert"
      />
    </div>
  );
}

export default Home;
