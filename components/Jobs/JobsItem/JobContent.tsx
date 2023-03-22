import React from 'react';
import Link from 'next/link';
import JobMeta from './JobMeta';
import { timeSince } from '@/utils/formatDate';
import { JobContentProps } from './types';

const JobContent = (props: JobContentProps): React.ReactElement => {
  const { job } = props;
  const {
    id,
    createdAt,
    jobTitle,
    companySlug,
    companyName,
    location,
    jobTags,
    jobCategory,
    jobSalary,
    jobType,
  } = job;

  return (
    <div className="items-center justify-between w-full lg:flex">
      <section className="flex flex-col sm:items-start sm:text-left">
        <Link href={`/company/${companySlug}`} rel="noopener noreferrer" target="new">
          <div className="mb-1 text-sm text-gray-500 hover:text-primary-700">{companyName}</div>
        </Link>
        <Link href={`/job/${id}`} rel="noopener noreferrer" target="new">
          <div className="mb-2 text-base font-semibold hover:text-primary-700 ">{jobTitle}</div>
        </Link>

        <JobMeta
          jobCategory={jobCategory}
          jobSalary={jobSalary}
          jobTags={jobTags}
          jobType={jobType}
          location={location}
        />
      </section>

      <section className="absolute top-5 right-5">
        <h1 className="flex justify-center text-sm font-light text-gray-500 lg:text-sm sm:justify-start">
          {timeSince(createdAt)}
        </h1>
      </section>
    </div>
  );
};

export default JobContent;
