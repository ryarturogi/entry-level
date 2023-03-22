import JobCard from '@/components/Jobs/JobsItem';
import Hero from '@/components/UI/Hero';
import ClientApi from '@/utils/initDatabase';
import Loader from '@/components/UI/Loader';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { GetServerSideProps } from 'next';

const JobsByCompany = ({ jobs, error }) => {
  const { push, query } = useRouter();
  const { company } = query;
  const isLoading = !jobs && !error;

  const companyCapitalize: string =
    typeof company === 'string'
      ? company.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
      : '';
  const companyLogo = jobs?.[0]?.companyLogo;

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <>
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
        <title>{`${companyCapitalize} Jobs`} | EntryLevel.dev</title>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
      </Head>
      <Hero
        action={{
          handler: () => {
            push('/jobs/new');
          },
        }}
        logo={companyLogo}
        title={`${companyCapitalize} Jobs`}
      />
      <ul className="w-full max-w-3xl space-y-5">
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
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { company } = params;

  try {
    const { data: fetchCompanyJobs, error } = await ClientApi.getJobs({
      contentType: 'companySlug',
      query: company,
    });

    if (error) {
      return {
        props: {
          jobs: [],
          error: error?.message || 'Server error occurred',
        },
      };
    }

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
};

JobsByCompany.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      jobTitle: PropTypes.string,
      jobDescription: PropTypes.string,
      companySlug: PropTypes.string,
      companyLogo: PropTypes.string,
      companyName: PropTypes.string,
      location: PropTypes.string,
    })
  ).isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default JobsByCompany;
