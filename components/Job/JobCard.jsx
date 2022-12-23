import JobTags from '@/components/Jobs/JobTags';
import Avatar from '@/components/UI/Avatar';
import { formatDate, isToday, timeSince } from '@/utils/formatDate';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

function JobCard({ job }) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center w-full px-2 mx-auto mt-5 max-w-7xl sm:px-6 lg:px-8">
      <section className="grid w-full grid-cols-12 px-2 space-x-8">
        <div className="col-span-8">
          <section className="mt-3 lg:mt-0">
            <h1 className="flex justify-center text-sm font-medium lg:text-sm sm:justify-start">
              POSTED{' '}
              {isToday(new Date(job.createdAt), new Date())
                ? timeSince(new Date(job.createdAt))
                : formatDate(new Date(job.createdAt))}
            </h1>
          </section>
          <section className="flex flex-col items-start w-full">
            <h1 className="text-2xl font-bold">{job.jobTitle}</h1>
            <ul className="flex my-2 space-x-2 text-sm text-gray-800 capitalize">
              <li onClick={() => router.push(`/jobs/${job.jobType}`)}>
                {job?.jobType?.replace('_', ' ')}
              </li>
              <li>{job.jobCategory}</li>
            </ul>

            {job.jobTags && (
              <div className="mb-3">
                <JobTags
                  tags={job.jobTags}
                  theme={job.hasCompanyColor.isActive ? 'light' : 'dark'}
                />
              </div>
            )}
          </section>
          <div
            className="text-base leading-relaxed text-gray-800"
            dangerouslySetInnerHTML={{ __html: job.jobDescription }}
          />
          {job.howToApply && (
            <Link
              className="text-lg font-bold text-blue-600 hover:text-gray-800"
              href={job.howToApply}
            >
              How to apply?
            </Link>
          )}
        </div>
        <div className="flex flex-col items-center h-full col-span-4 px-5 py-8 space-y-2 bg-gray-100 shadow rounded-lg max-h-[45rem]">
          <Link className="mb-2" href={`/company/${job.companySlug}`}>
            {job.hasCompanyLogo && <Avatar avatar={job.companyLogo} size="md" />}
          </Link>
          <div className="text-center">
            <h3 className="text-2xl font-bold">{job.companyName}</h3>
            <span className="text-base capitalize">{job.location}</span>
          </div>
          {job.companyDescription}
        </div>
      </section>
    </div>
  );
}

export default JobCard;

JobCard.propTypes = {
  job: PropTypes.object.isRequired,
};
