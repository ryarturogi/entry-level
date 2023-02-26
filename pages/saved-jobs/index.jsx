import JobsList from '@/components/Jobs/JobsList';
import Head from '@/components/partials/Head';
import Hero from '@/components/UI/Hero';
import Client from '@/utils/initDatabase';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';

function SavedJobs({ error, jobs: savedJobs }) {
  const isLoading = !savedJobs && !error;

  return (
    <div className="min-h-screen mb-20">
      <Head>
        <title>Saved Jobs | EntryLevelDevs</title>
        <meta content="Saved Jobs" name="description" />
      </Head>

      <Hero title="Saved Jobs" />
      <JobsList error={error} jobs={savedJobs || []} loading={isLoading} />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const savedJobs = await Client(process.env.NEXT_PUBLIC_PROVIDER_NAME).Auth.getSavedJobs();

    return {
      props: {
        jobs: savedJobs || [],
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

SavedJobs.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.object).isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};

export default SavedJobs;
