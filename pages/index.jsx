import Filters from '@/components/Jobs/Filters';
import JobsList from '@/components/Jobs/JobsList';
import Hero from '@/components/UI/Hero';
import Head from '@/components/partials/Head';
import useFilteredJobs from '@/hooks/useFilteredJobs';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const Home = () => {
  const router = useRouter();
  const [jobs, loading, error, handleFiltersChange] = useFilteredJobs();

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
        <section className="min-h-screen col-span-12 lg:col-span-8">
          <header className="flex flex-col items-center justify-between pb-6 pl-5 sm:flex-row">
            <h2 className="text-lg font-semibold sm:text-xl md:text-2xl">Job postings</h2>

            {/* <JobsSortBy onChange={handleFiltersChange} /> */}
          </header>
          <JobsList error={error} jobs={jobs} loading={loading} />
        </section>

        <Filters onChange={handleFiltersChange} />
      </section>
    </div>
  );
};

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
  error: PropTypes.string,
};

export default Home;
