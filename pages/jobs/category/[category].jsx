import JobCard from '@/components/Jobs/JobsItem';
import Hero from '@/components/UI/Hero';
import useJobs from '@/hooks/useJobs';
import Loader from 'components/UI/Loader';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const JobsByCategory = () => {
  const { query, push } = useRouter();
  const { category } = query;

  const { jobs, loading, error } = useJobs('jobCategory', category);
  const categoryCapitalize = category?.charAt(0)?.toUpperCase() + category?.slice(1) || '';

  if (loading) {
    return <Loader />;
  }

  if (error?.message) {
    return <div>{error.message}</div>;
  }

  return (
    <section className="flex flex-col items-center justify-center mx-auto max-w-8xl">
      <Head>
        <title>{`${categoryCapitalize} Category`} | EntryLevel.dev</title>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
      </Head>
      <Hero
        action={{
          handler: () => {
            push('/jobs/new');
          },
        }}
        title={`${categoryCapitalize} Category`}
      />
      <div className="w-full max-w-3xl space-y-5">
        {jobs && !loading && jobs.map((job) => <JobCard job={job} key={job.id} />)}
      </div>
    </section>
  );
};

JobsByCategory.propTypes = {
  category: PropTypes.string,
  jobs: PropTypes.array,
  error: PropTypes.object,
  loading: PropTypes.bool,
};

export default JobsByCategory;
