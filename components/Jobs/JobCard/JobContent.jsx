import PropTypes from 'prop-types';
import JobMeta from './JobMeta';

import { timeSince } from '@/utils/formatDate';
import Link from 'next/link';

const JobContent = (props) => (
  <div className="items-center justify-between w-full lg:flex sm:pr-5">
    <section className="flex flex-col sm:items-start sm:text-left">
      <Link href={`/company/${props.companySlug}`}>
        <div className="mb-1 text-sm text-gray-500 hover:text-primary-700">{props.companyName}</div>
      </Link>
      <Link href={`/job/${props.id}`}>
        <div className="mb-2 text-base font-semibold hover:text-primary-700 ">{props.jobTitle}</div>
      </Link>

      <JobMeta {...props} />
    </section>

    <section className="absolute top-5 right-5">
      <h1 className="flex justify-center text-sm font-light text-gray-500 lg:text-sm sm:justify-start">
        {timeSince(props.createdAt)}
      </h1>
    </section>
  </div>
);

JobContent.propTypes = {
  id: PropTypes.string,
  createdAt: PropTypes.string,
  isFeatured: PropTypes.bool,
  isGuaranteed: PropTypes.bool,
  jobTitle: PropTypes.string,
  jobTags: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  companyName: PropTypes.string,
  companySlug: PropTypes.string,
  hasCompanyLogo: PropTypes.bool,
  hasCompanyColor: PropTypes.shape({
    color: PropTypes.string,
    isActive: PropTypes.bool,
  }),
};

export default JobContent;
