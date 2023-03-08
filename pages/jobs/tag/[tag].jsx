import JobsItem from '@/components/Jobs/JobsItem';
import Hero from '@/components/UI/Hero';
import Loader from '@/components/UI/Loader';
import useJobs from '@/hooks/useJobs';
import Head from 'next/head';
import { useRouter } from 'next/router';

const JobsByLocation = () => {
  const { query, push } = useRouter();
  const { tag } = query;
  const { jobs, loading, error } = useJobs('jobTags', tag);

  const tagCapitalize = tag?.charAt(0)?.toUpperCase() + tag?.slice(1);

  if (loading) {
    return <Loader />;
  }

  if (error?.message) {
    return <div>{error.message}</div>;
  }

  return (
    <section className="flex flex-col items-center justify-center mx-auto max-w-8xl">
      <Head>
        <title>{`${tagCapitalize} Jobs`} | EntryLevel.dev</title>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
      </Head>
      <Hero
        action={{
          handler: () => {
            push('/jobs/new');
          },
        }}
        title={`Jobs listing at ${tagCapitalize} `}
      />
      <ul className="w-full max-w-3xl space-y-5">
        {jobs && !loading && jobs.map((job) => <JobsItem job={job} key={job.id} />)}
      </ul>
    </section>
  );
};

export default JobsByLocation;
