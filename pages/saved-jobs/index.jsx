import JobsList from '@/components/Jobs/JobsList';
import Hero from '@/components/UI/Hero';
import Head from '@/components/partials/Head';
import { useSavedJobs } from '@/hooks/useSavedJobs';
import { useUser } from '@supabase/auth-helpers-react';
import 'react-toastify/dist/ReactToastify.css';

function SavedJobs() {
  const user = useUser();
  const userId = user?.id;
  const { savedJobs, isLoading, error } = useSavedJobs(userId);

  return (
    <div className="min-h-screen mb-20">
      <Head>
        <title>Saved Jobs | EntryLevelDevs</title>
        <meta content="Saved Jobs" name="description" />
      </Head>

      <Hero title="Saved Jobs" />
      <JobsList error={error} jobs={savedJobs} loading={isLoading} />
    </div>
  );
}

export default SavedJobs;
