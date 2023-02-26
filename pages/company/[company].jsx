import JobCard from '@/components/Jobs/JobCard';
import Hero from '@/components/UI/Hero';
import Client from '@/utils/initDatabase';
import Loader from 'components/UI/Loader';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

function JobsByCompany({ jobs, error }) {
  const router = useRouter();
  const { company } = router.query;
  const isLoading = !jobs && !error;

  const companyCapitalize = company?.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  const companyLogo = jobs?.[0]?.companyLogo;

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <>
        <Head title="Server error" />
        <div className="flex items-start justify-center w-screen h-screen">
          <div className="flex flex-col items-center justify-center space-y-5 text-center">
            <Image
              alt="server error image"
              className="mt-16 sm:mt-24"
              height={150}
              src="/img/404-error.svg"
              width={120}
            />
            <h1 className="text-xl font-semibold">{error || 'Server error occurred'}</h1>
          </div>
        </div>
      </>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center mx-auto max-w-8xl">
      <Head>
        <title>{`${companyCapitalize} Jobs`} | EntryLevelDevs</title>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
      </Head>
      <Hero logo={companyLogo} title={`${companyCapitalize} Jobs`} />
      <ul className="w-full space-y-5 max-w-8xl">
        {error && error.message}
        {(isLoading && !error && (
          <li className="flex items-center justify-center w-full ">
            <Loader />
          </li>
        )) ||
          (jobs ? jobs.map((job) => <JobCard job={job} key={job.id} />) : null)}
      </ul>
    </section>
  );
}

export async function getServerSideProps({ params }) {
  const { company } = params;

  try {
    const fetchCompanyJobs = await Client(process.env.NEXT_PUBLIC_PROVIDER_NAME).getJobs(
      'companySlug',
      company
    );

    return {
      props: {
        jobs: fetchCompanyJobs || [],

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

JobsByCompany.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.object).isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};

export default JobsByCompany;
