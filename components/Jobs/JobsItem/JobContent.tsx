import React from 'react';
import Link from 'next/link';
import JobMeta from './JobMeta';
import { timeSince } from '@/utils/formatDate';
import { Job } from './types';

const JobContent = (job: Job): React.ReactElement => {
  return (
    <div className="items-center justify-between w-full lg:flex">
      <section className="flex flex-col sm:items-start sm:text-left">
        <Link href={`/company/${job.companySlug}`} rel="noopener noreferrer" target="new">
          <div className="mb-1 text-sm text-gray-500 hover:text-primary-700">{job.companyName}</div>
        </Link>
        <Link href={`/job/${job.id}`} rel="noopener noreferrer" target="new">
          <div className="mb-2 text-base font-semibold hover:text-primary-700 ">{job.jobTitle}</div>
        </Link>

        <JobMeta
          jobCategory={job.jobCategory}
          jobSalary={job.jobSalary}
          jobTags={job.jobTags}
          jobType={job.jobType}
          location={job.location}
        />
      </section>

      <section className="absolute top-5 right-5">
        <h1 className="flex justify-center text-sm font-light text-gray-500 lg:text-sm sm:justify-start">
          {timeSince(job.createdAt)}
        </h1>
      </section>
    </div>
  );
};

export default JobContent;
