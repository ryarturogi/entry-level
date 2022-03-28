/*
 * Import Image from 'next/image';
 * import Link from 'next/link';
 */

import JobTags from '@/components/Jobs/JobTags';
import Avatar from '@/components/UI/Avatar';

function JobCard({ job }) {
  return (
    <li className="flex flex-col items-center justify-center w-full">
      {job.hasCompanyLogo && <Avatar avatar={job.companyLogo} size="md" />}
      {job.companyName}
      {job.companyDescription}
      {job.companySlug}
      {job.location}
      {job.howToApply}
      {job.jobTitle}
      {job.jobType}
      {job.jobCategory}
      {job.jobDescription}
      {job.createdAt}
      {job.isFeatured}
      {job.isGuaranteed}
      {job.jobTags && (
        <JobTags tags={job.jobTags} theme={job.hasCompanyColor.isActive ? 'light' : 'dark'} />
      )}
    </li>
  );
}

export default JobCard;
