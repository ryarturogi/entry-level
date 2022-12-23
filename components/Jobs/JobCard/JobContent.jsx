import JobTags from '../JobTags';
import JobMeta from './JobMeta';

import { formatDate, isToday, timeSince } from '@/utils/formatDate';
import Link from 'next/link';

const JobContent = (props) => (
  <>
    <div className="items-center justify-between w-full lg:flex sm:pr-5">
      <section className="flex flex-col items-center text-center sm:items-start sm:text-left">
        <div className="space-x-2">
          {props.isFeatured && <small className="text-xs font-medium capitalize">Featured</small>}
          {props.isGuaranteed && props.isFeatured && <span>|</span>}
          {props.isGuaranteed && (
            <small className="text-xs font-medium capitalize">Guaranteed</small>
          )}
        </div>

        <Link href={`/company/${props.companySlug}`}>
          <div className="mb-0.5 text-sm font-light hover:text-primary-500">
            {props.companyName}
          </div>
        </Link>
        <Link href={`/job/${props.id}`}>
          <div className="text-lg font-bold hover:text-primary-500 ">{props.jobTitle}</div>
        </Link>

        <JobMeta {...props} />
        {props.jobTags && (
          <JobTags tags={props.jobTags} theme={props.hasCompanyColor.isActive ? 'light' : 'dark'} />
        )}
      </section>

      <section className="mt-3 lg:mt-0">
        <h1 className="flex justify-center text-sm font-medium lg:text-sm sm:justify-start">
          {isToday(new Date(props.createdAt), new Date())
            ? timeSince(props.createdAt)
            : formatDate(props.createdAt)}
        </h1>
      </section>
    </div>

    <hr
      className={`w-full h-1 lg:w-1 lg:h-[6rem] rounded-xl ${
        props.hasCompanyColor.isActive ? 'bg-white' : 'bg-gray-100'
      }`}
    />
  </>
);

export default JobContent;
