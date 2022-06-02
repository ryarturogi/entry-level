import { useRouter } from 'next/router';
import Link from 'next/link';
import { formatDate, isToday, timeSince } from '@/utils/formatDate';

import { BookmarkIcon } from '@heroicons/react/outline';
import { ArrowRightIcon } from '@heroicons/react/solid';

import JobTags from '@/components/Jobs/JobTags';
import Avatar from '@/components/UI/Avatar';
import Button from '@/components/UI/Button';

const jobStatus = (job) => {
  switch (true) {
    case job.isGuaranteed:
      return 'border-b-[2rem] sm:border-b-0 sm:border-l-[4rem] border-accent-100';
    case job.isFeatured:
      return 'border-l-[4.5rem] border-accent-800';
    default:
      return '';
  }
};

function JobCard({ job }) {
  const router = useRouter();

  return (
    <li
      className={`
        max-w-4xl mx-auto relative flex flex-col justify-center w-full px-5 py-3.5 bg-white rounded-2xl sm:rounded-3xl shadow-md shadow-slate-300
      ${jobStatus(job)}`}
      style={{
        backgroundColor: job.hasCompanyColor.isActive ? job.hasCompanyColor.color : '#fff',
        border: job.hasCompanyColor.isActive ? 'none' : '',
        color: job.hasCompanyColor.isActive ? '#fff' : '#000',
      }}
    >
      <div
        className={`lg:flex items-center space-x-5 ${
          (job.isFeatured || job.isGuaranteed) && !job.hasCompanyColor.isActive ? '-ml-14' : 'ml-2'
        }`}
      >
        <div className="flex flex-col items-center justify-start w-full space-x-5 space-y-3 lg:justify-between sm:space-y-0 sm:items-start lg:items-start sm:flex-row">
          <div className="self-center">
            {job.hasCompanyLogo && (
              <Link href={`job/${job.id}`}>
                <a>
                  <Avatar avatar={job.companyLogo} size="md" />
                </a>
              </Link>
            )}
          </div>

          <div className="flex flex-col justify-between w-full lg:items-center lg:flex-row">
            <div className="items-center justify-between w-full lg:flex sm:pr-5">
              <section className="flex flex-col items-center text-center sm:items-start sm:text-left">
                {job.isFeatured && (
                  <small className="text-xs font-medium capitalize">Featured</small>
                )}
                {job.isGuaranteed && (
                  <small className="text-xs font-medium capitalize">Guaranteed</small>
                )}

                <Link href={`/job/${job.id}`}>
                  <a>
                    <div className="mb-0.5 text-sm font-light hover:text-accent-500">
                      {job.companyName}
                    </div>
                    <div className="text-lg font-bold hover:text-accent-500 ">{job.jobTitle}</div>
                  </a>
                </Link>

                <nav className="flex space-x-2 place-items-start mt-0.5 mb-0.5 text-xs text-gray-800">
                  <li
                    className="capitalize cursor-pointer hover:text-accent-500"
                    onClick={() => router.push(`/jobs/location/${job.location}`)}
                  >
                    Location: <strong>{job.location}</strong>
                  </li>
                  <li>
                    <strong>|</strong>
                  </li>
                  <li
                    className="capitalize cursor-pointer hover:text-accent-500"
                    onClick={() => router.push(`/jobs/type/${job.jobType}`)}
                  >
                    Type: <strong>{job?.jobType?.replace('_', ' ')}</strong>
                  </li>
                  <li>
                    <strong>|</strong>
                  </li>
                  <li
                    className="capitalize cursor-pointer hover:text-accent-500"
                    onClick={() => router.push(`/jobs/category/${job.jobCategory}`)}
                  >
                    Category: <strong>{job.jobCategory}</strong>
                  </li>
                </nav>
                {job.jobTags && (
                  <JobTags
                    tags={job.jobTags.slice(0, 5)}
                    theme={job.hasCompanyColor.isActive ? 'light' : 'dark'}
                  />
                )}
              </section>

              <section className="mt-3 lg:mt-0">
                <h1 className="flex justify-center text-sm font-medium lg:text-sm sm:justify-start">
                  {isToday(new Date(job.createdAt), new Date())
                    ? timeSince(job.createdAt)
                    : formatDate(job.createdAt)}
                </h1>
              </section>
            </div>

            <hr
              className={`w-full h-1 lg:w-1 lg:h-[6rem] rounded-xl ${
                job.hasCompanyColor.isActive ? 'bg-white' : 'bg-gray-100'
              }`}
            />

            <div className="flex w-full items-center sm:max-w-[8rem] space-x-5 justify-center sm:pl-5">
              <Button className="p-2 text-white rounded-full w-9 h-9 bg-accent-800 hover:bg-green-500">
                <BookmarkIcon />
              </Button>

              <Link href={`job/${job.id}`}>
                <a className="p-2 text-white rounded-full w-9 h-9 bg-notice-danger-100 hover:bg-green-500">
                  <ArrowRightIcon />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default JobCard;
