import { getJobs, searchJobs } from '@/store/actions/jobAction';
import { useDispatch, useSelector } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';

import JobSearch from '@/components/Jobs/JobSearch';
import JobsList from '@/components/Jobs/JobsList';
import Head from '@/components/partials/Head';
import Hero from '@/components/UI/Hero';

const FindJobs = () => {
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

      <JobSearch loading={loading} onSearch={handleOnSearch} />
      <JobsList error={error} jobs={jobs} loading={loading} />
    </div>
  );
};

export default FindJobs;
