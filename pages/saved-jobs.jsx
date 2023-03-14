import JobsList from '@/components/Jobs/JobsList';
import Hero from '@/components/UI/Hero';
import Head from '@/components/partials/Head';
import { useSavedJobs } from '@/hooks/useSavedJobs';
import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

const SavedJobs = () => {
  const { push } = useRouter();
  const user = useUser();
  const userId = user?.id;
  const { savedJobs, isLoading, error } = useSavedJobs(userId);

  return (
    <div className="min-h-screen mb-20">
      <Head>
        <title>Saved Jobs | EntryLevel.dev</title>
        <meta content="Saved Jobs" name="description" />
      </Head>

      <Hero
        action={{
          title: 'Find the perfect job',
          handler: () => {
            push('/jobs/new');
          },
        }}
        title="All your saved jobs"
      />
      <div className="w-full max-w-3xl mx-auto">
        <JobsList error={error} jobs={savedJobs} loading={isLoading} />
      </div>
    </div>
  );
};

export default SavedJobs;
