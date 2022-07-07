import { searchJobs, getJobs } from '@/store/actions/jobAction';
import { useDispatch, useSelector } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';

import Hero from '@/components/UI/Hero';
import JobSearch from '@/components/Jobs/JobSearch';
import JobsList from '@/components/Jobs/JobsList';
import Head from '@/components/partials/Head';

function FindJobs() {
  const dispatch = useDispatch();
  const { loading, error, jobs } = useSelector((state) => state.jobsList);

  const handleOnSearch = (search) => {
    if (search.length > 2) {
      return dispatch(searchJobs(search));
    }
    return dispatch(getJobs());
  };

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
    </div>
  );
}

export default FindJobs;
