import Filters from '@/components/Jobs/Filters';
import JobsList from '@/components/Jobs/JobsList';
import JobsSortBy from '@/components/Jobs/JobsSortBy';
import Head from '@/components/partials/Head';
import Hero from '@/components/UI/Hero';
import Client from '@/utils/initDatabase';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react';

const PROVIDER_NAME = String(process.env.NEXT_PUBLIC_PROVIDER_NAME);

const Home = ({ jobs = [], error = false }) => {
  const router = useRouter();
  const [currentJobs, setCurrentJobs] = useState(jobs);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(error || '');

  const handleFiltersChange = async (filters) => {
    setLoading(true);

    try {
      const filteredJobs = await Client(PROVIDER_NAME).getFilteredJobs(filters);
      setCurrentJobs(filteredJobs);
    } catch (error) {
      setErrors(error?.response?.data?.message || error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen mb-20">
      <Head />
      <Hero
        action={{
          handler: () => {
            router.push('/jobs/new');
          },
        }}
      />

      <section className="flex flex-col w-full gap-10 mx-auto max-w-8xl sm:grid sm:grid-cols-12">
        <section className="col-span-12 lg:col-span-8">
          <header className="flex flex-col items-center justify-between pb-6 pl-5 sm:flex-row">
            <h2 className="text-lg font-semibold sm:text-xl md:text-2xl">Job postings</h2>

            <JobsSortBy onChange={handleFiltersChange} />
          </header>
          <JobsList error={errors} jobs={currentJobs} loading={loading} />
        </section>

        <Filters onChange={handleFiltersChange} />
      </section>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const Jobs = await Client(process.env.NEXT_PUBLIC_PROVIDER_NAME).getJobs();

    return {
      props: {
        jobs: Jobs,
        error: false,
      },
    };
  } catch (error) {
    return {
      props: {
        jobs: [],
        error: error?.response?.data?.message || error.message,
      },
    };
  }
}

Home.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      jobTitle: PropTypes.string,
      companySlug: PropTypes.string,
      company: PropTypes.string,
      location: PropTypes.string,
      description: PropTypes.string,
    })
  ),
  error: PropTypes.bool,
};

export default Home;
