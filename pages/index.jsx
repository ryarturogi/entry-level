import 'react-toastify/dist/ReactToastify.css';

import { toast, ToastContainer } from 'react-toastify';

import Hero from '@/components/Home/Hero';
import JobSearch from '@/components/Jobs/JobSearch';
import JobsList from '@/components/Jobs/JobsList';
import Head from '@/components/partials/Head';

function Home() {
  return (
    <>
      <Head />
      <Hero />
      <JobSearch />
      <JobsList />
      <ToastContainer
        autoClose={1800}
        closeOnClick
        hideProgressBar
        limit={10}
        pauseOnHover
        position={toast.POSITION.BOTTOM_RIGHT}
        role="alert"
      />
    </>
  );
}

export default Home;
