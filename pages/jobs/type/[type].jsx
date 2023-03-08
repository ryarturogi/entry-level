import JobCard from '@/components/Jobs/JobsItem';
import Hero from '@/components/UI/Hero';
import Loader from '@/components/UI/Loader';
import useJobs from '@/hooks/useJobs';
import Head from 'next/head';
import { useRouter } from 'next/router';

const JobsByLocation = () => {
  const { query, push } = useRouter();
  const { type } = query;
  const { jobs, loading, error } = useJobs('jobTypes', type);

  const typeCapitalize = type?.charAt(0)?.toUpperCase() + type?.slice(1);

  if (loading) {
    return <Loader />;
  }

  if (error?.message) {
    return <div>{error.message}</div>;
  }

  return (
    <section className="flex flex-col items-center justify-center mx-auto max-w-8xl">
      <Head>
        <title>{`${typeCapitalize} Jobs`} | EntryLevel.dev</title>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
      </Head>
      <Hero
        action={{
          handler: () => {
            push('/jobs/new');
          },
        }}
        title={`Jobs listing at ${typeCapitalize} `}
      />
      <ul className="w-full max-w-3xl space-y-5">
        {jobs && !loading && jobs.map((job) => <JobCard job={job} key={job.id} />)}
      </ul>
    </section>
  );
};

export default JobsByLocation;
