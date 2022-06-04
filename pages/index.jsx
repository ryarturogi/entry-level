import { useEffect } from 'react';
import { searchJobs, getJobs } from '@/store/actions/jobAction';
import { useDispatch, useSelector } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

import Hero from '@/components/Home/Hero';
import JobSearch from '@/components/Jobs/JobSearch';
import JobsList from '@/components/Jobs/JobsList';
import Head from '@/components/partials/Head';

function Home() {
  const dispatch = useDispatch();
  const jobsList = useSelector((state) => state.jobsList);
  const { loading, error, jobs } = jobsList;

  const handleOnSearch = (search) => {
    if (search.length > 2) {
      search = search
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      console.log(search);
      return dispatch(searchJobs(search));
    }
    return dispatch(getJobs());
  };

  return (
    <div className="min-h-screen mb-20">
      <Head />
      <Hero />
      <JobSearch onSearch={handleOnSearch} />
      <JobsList jobs={jobs} error={error} loading={loading} />
      <ToastContainer
        autoClose={1800}
        closeOnClick
        hideProgressBar
        limit={10}
        pauseOnHover
        position={toast.POSITION.BOTTOM_RIGHT}
        role="alert"
      />
    </div>
  );
}

export default Home;
