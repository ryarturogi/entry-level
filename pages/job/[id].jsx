import Client from '@/utils/initDatabase';
import Image from 'next/image';
import PropTypes from 'prop-types';

import JobCard from '@/components/Job/JobCard';
import Head from '@/components/partials/Head';
import Loader from '@/components/UI/Loader';

function Job({ job, companyJobs, error }) {
  const isLoading = !job && !error;

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
    <>
      <Head title={job ? `${job.jobTitle} Job` : 'Job'} />
      <section className="pt-8 mx-auto max-w-8xl">
        {job && <JobCard job={{ ...job, companyJobs }} />}
      </section>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;

  try {
    let fetchCompanyJobs;
    const { data: fetchJob, error: fetchJobError } = await Client(
      process.env.NEXT_PUBLIC_PROVIDER_NAME
    ).getJob(id);

    if (fetchJobError) {
      return {
        props: {
          job: {},
          companyJobs: [],
          error: fetchJobError?.message || 'Server error occurred',
        },
      };
    }

    if (fetchJob?.companySlug) {
      const { data, error } = await Client(process.env.NEXT_PUBLIC_PROVIDER_NAME).getJobs(
        'companySlug',
        fetchJob.companySlug
      );

      if (error) {
        return {
          props: {
            job: {},
            companyJobs: [],
            error: error?.message || 'Server error occurred',
          },
        };
      }

      fetchCompanyJobs = data;

      fetchCompanyJobs = fetchCompanyJobs.filter((job) => job.id !== fetchJob.id);
    }

    return {
      props: {
        job: fetchJob || {},
        companyJobs: fetchCompanyJobs || [],
        error: false,
      },
    };
  } catch (error) {
    return {
      props: {
        job: {},
        companyJobs: [],
        error: error?.response?.data?.message || error.message,
      },
    };
  }
}

Job.propTypes = {
  job: PropTypes.object.isRequired,
  companyJobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      jobTitle: PropTypes.string,
      jobDescription: PropTypes.string,
      companySlug: PropTypes.string,
      company: PropTypes.string,
      location: PropTypes.string,
    })
  ),
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default Job;
