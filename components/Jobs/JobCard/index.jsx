import { useUser } from '@/hooks/useAuthUser';

import PropTypes from 'prop-types';
import CompanyLogo from './CompanyLogo';
import JobActions from './JobActions';
import JobContent from './JobContent';

const jobStatus = (job) => {
  switch (true) {
    case job.isGuaranteed:
      return 'border-b-[2rem] sm:border-b-0 sm:border-l-[4rem] border-primary-100';
    case job.isFeatured:
      return 'border-l-[4.5rem] border-primary-800';
    default:
      return '';
  }
};

function JobCard({ job }) {
  const { user } = useUser();

  return (
    <div
      className={`
        max-w-4xl mx-auto relative flex flex-col justify-center w-full px-5 py-3.5 bg-white rounded-2xl sm:rounded-3xl shadow-md shadow-gray-300
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
          <CompanyLogo
            companyLogo={job.companyLogo}
            companySlug={job.companySlug}
            hasCompanyLogo={job.hasCompanyLogo}
          />
          <div className="flex flex-col justify-between w-full lg:items-center lg:flex-row">
            <JobContent {...job} />
            <JobActions {...job} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;

JobCard.propTypes = {
  job: PropTypes.shape({
    companyLogo: PropTypes.string.isRequired,
    companySlug: PropTypes.string.isRequired,
    hasCompanyColor: PropTypes.shape({
      color: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired,
    }).isRequired,
    hasCompanyLogo: PropTypes.bool.isRequired,
    isFeatured: PropTypes.bool.isRequired,
    isGuaranteed: PropTypes.bool.isRequired,
  }).isRequired,
};
