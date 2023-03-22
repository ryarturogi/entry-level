import React from 'react';
import JobTags from '@/components/Jobs/JobTags';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { NumericFormat } from 'react-number-format';
import { JobMetaProps } from './types';

const JobMeta = (props: JobMetaProps): React.ReactElement => {
  const { location, jobType, jobCategory, jobSalary, jobTags } = props;
  const router = useRouter();

  return (
    <>
      <nav className="flex flex-col xs:flex-row gap-2 sm:gap-2 place-items-start sm:mt-0.5 mb-0.5 text-sm list-none">
        {location && (
          <li>
            <button
              className="flex items-center space-x-1 capitalize cursor-pointer hover:text-primary-700"
              onClick={() => router.push(`/jobs/location/${location}`)}
            >
              <Image alt="remote" height={13} src="/img/location-icon.svg" width={13} />
              <span>{location}</span>
            </button>
          </li>
        )}

        {jobType && (
          <li>
            <button
              className="flex items-center space-x-2 capitalize cursor-pointer hover:text-primary-700"
              onClick={() => router.push(`/jobs/type/${jobType}`)}
            >
              <span className="text-xs text-primary-200">⏺</span>
              <span>{props?.jobType?.replace('_', ' ')}</span>
            </button>
          </li>
        )}

        {jobCategory && (
          <li>
            <button
              className="flex items-center space-x-2 capitalize cursor-pointer hover:text-primary-700"
              onClick={() => router.push(`/jobs/category/${jobCategory}`)}
            >
              <span className="text-xs text-primary-200">⏺</span>
              <span>{props?.jobCategory?.replace('_', ' ')}</span>
            </button>
          </li>
        )}

        {jobSalary && (
          <li className="flex items-center space-x-1.5 cursor-pointer hover:text-primary-700">
            <span className="text-xs text-primary-200">⏺</span>
            <span>Salary:</span>
            <NumericFormat
              className="flex items-center space-x-1"
              decimalScale={0}
              displayType="text"
              fixedDecimalScale
              prefix="$"
              thousandSeparator=","
              value={jobSalary}
            />
          </li>
        )}
      </nav>
      {/* list of skills/tags */}
      {jobTags?.length > 0 && <JobTags tags={jobTags} />}
    </>
  );
};

export default JobMeta;
