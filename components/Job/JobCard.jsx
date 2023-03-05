import JobSidebar from '@/components/Job/JobSidebar';
import { timeSince } from '@/utils/formatDate';
import Image from 'next/image';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const JobCard = ({ job }) => {
  const router = useRouter();

  return (
    <main className="grid w-full grid-cols-12 gap-12 px-2">
      <article className="col-span-12 xl:col-span-8">
        <section className="flex flex-col items-start w-full p-8 space-y-4 bg-white rounded-2xl">
          <article className="mt-3 lg:mt-0">
            <time
              className="flex justify-center text-sm font-medium lg:text-sm sm:justify-start"
              dateTime={new Date(job.createdAt).toISOString()}
            >
              {timeSince(new Date(job.createdAt))}
            </time>
          </article>

          <article className="flex flex-col items-start w-full">
            <header>
              <h1 className="text-3xl font-semibold">{job.jobTitle}</h1>
            </header>

            <ul className="flex mt-3 mb-3 space-x-8 text-base text-gray-800 capitalize">
              {job.location && (
                <li>
                  <button
                    className="flex items-center space-x-1 capitalize cursor-pointer hover:text-primary-700"
                    name="location"
                    onClick={() => router.push(`/jobs/location/${job.location}`)}
                    type="button"
                  >
                    <Image alt="remote" height={13} src="/img/location-icon.svg" width={13} />
                    <span>{job.location}</span>
                  </button>
                </li>
              )}
              <li>
                <button
                  name="jobType"
                  onClick={() => router.push(`/jobs/${job.jobType}`)}
                  type="button"
                >
                  {job?.jobType?.replace('_', ' ')}
                </button>
              </li>
              <li>{job.jobCategory}</li>
            </ul>
          </article>

          {job.howToApply && (
            <button
              className="inline-block px-12 py-2 mt-5 text-lg font-semibold text-white uppercase rounded-md bg-secondary-500 hover:bg-primary-700 w-fit-content"
              name="apply"
              onClick={() => window.open(job.howToApply, '_blank')}
              title="Apply now"
              type="button"
            >
              Apply now
            </button>
          )}
        </section>

        <section className="flex flex-col items-start w-full px-8 mt-10">
          <article
            className="text-base leading-relaxed text-gray-800"
            dangerouslySetInnerHTML={{ __html: job.jobDescription }}
          />
        </section>
      </article>

      {/* Sidebar */}
      <JobSidebar job={job} />
    </main>
  );
};

export default JobCard;

JobCard.propTypes = {
  job: PropTypes.objectOf({
    _id: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    jobSlug: PropTypes.string.isRequired,
    jobType: PropTypes.string.isRequired,
    jobCategory: PropTypes.string.isRequired,
    jobDescription: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    companySlug: PropTypes.string.isRequired,
    companyDescription: PropTypes.string.isRequired,
    companyRating: PropTypes.number.isRequired,
    companyJobs: PropTypes.arrayOf({
      _id: PropTypes.string.isRequired,
      jobTitle: PropTypes.string.isRequired,
      jobSlug: PropTypes.string.isRequired,
    }),
    hasCompanyLogo: PropTypes.bool.isRequired,
    companyLogo: PropTypes.string.isRequired,
    howToApply: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};
