import Avatar from '@/components/UI/Avatar';
import Rating from '@/components/UI/Rating';
import { timeSince } from '@/utils/formatDate';
import { EyeIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from '../UI/Button';

const JobCard = ({ job }) => {
  const router = useRouter();

  return (
    <section className="grid w-full grid-cols-12 gap-12 px-2">
      <section className="col-span-12 xl:col-span-8">
        <section className="flex flex-col items-start w-full p-8 space-y-4 bg-white rounded-2xl">
          <div className="mt-3 lg:mt-0">
            <div className="flex justify-center text-sm font-medium lg:text-sm sm:justify-start">
              {timeSince(new Date(job.createdAt))}
            </div>
          </div>

          <div className="flex flex-col items-start w-full">
            <h1 className="text-3xl font-semibold">{job.jobTitle}</h1>
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
          </div>

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
          <div
            className="text-base leading-relaxed text-gray-800"
            dangerouslySetInnerHTML={{ __html: job.jobDescription }}
          />
        </section>
      </section>

      {/* Sidebar */}
      <aside className="col-span-12 px-10 py-8 bg-white xl:col-span-4 rounded-2xl">
        <div className="flex items-center w-full space-x-4">
          <Link href={`/company/${job.companySlug}`}>
            <div className="mb-2">
              {job.hasCompanyLogo && <Avatar avatar={job.companyLogo} size="md" />}
            </div>
          </Link>
          <div>
            <h3 className="text-lg font-semibold">{job.companyName}</h3>
            <Rating rating={job.companyRating} />
          </div>
        </div>
        <p className="mt-4 text-base font-light leading-relaxed text-gray-800">
          {job.companyDescription?.length > 200 ? (
            <span>{`${job.companyDescription?.slice(0, 200)}...`}</span>
          ) : (
            <span>{job.companyDescription}</span>
          )}
        </p>

        {/* job listing */}
        {job.companyJobs && job.companyJobs.length > 0 && (
          <div className="flex flex-col items-start w-full mt-10">
            <h3 className="flex space-x-2 text-lg font-semibold">
              Company&apos;s Listing
              {job.companyJobs?.length && (
                <span className="flex items-center justify-center w-5 h-5 mt-1 ml-2 text-xs text-white rounded-full bg-primary-500">
                  {job.companyJobs?.length || 0}
                </span>
              )}
            </h3>

            {job.companyJobs?.length && (
              <>
                <ul className="flex flex-col w-full mt-4 space-y-4">
                  {job.companyJobs.slice(0, 4).map((job) => (
                    <li key={job.id}>
                      <Link href={`/job/${job.id}`} title={job.jobTitle}>
                        <div className="flex items-center justify-between px-3.5 rounded-lg py-4 space-x-4 text-base font-light text-gray-800 border-2 border-primary-50">
                          <h4 className="font-semibold">{job.jobTitle}</h4>

                          <div className="grid min-w-[40px] min-h-[40px] rounded place-content-center bg-primary-100">
                            <span className="w-6 h-6 text-primary-800">
                              <EyeIcon />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                {job.companyJobs.length > 4 && (
                  <div className="flex items-center justify-center w-full mt-6">
                    <Button
                      color="primary"
                      fullWidth
                      onClick={() => router.push(`/company/${job.companySlug}`)}
                      rounded="md"
                      size="md"
                    >
                      <span className="text-xl font-light">View all jobs</span>
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </aside>
    </section>
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
