import { useUser } from '@/hooks/useAuthUser';

import PropTypes from 'prop-types';
import CompanyLogo from './CompanyLogo';
import JobActions from './JobActions';
import JobContent from './JobContent';

// const jobStatus = (job) => {
//   switch (true) {
//     case job.isGuaranteed:
//       return 'border-b-[2rem] sm:border-b-0 sm:border-l-[4rem] border-primary-100';
//     case job.isFeatured:
//       return 'border-l-[4.5rem] border-primary-800';
//     default:
//       return '';
//   }
// };
// ${jobStatus(job)}
// ${
//   (job.isFeatured || job.isGuaranteed) && !job.hasCompanyColor.isActive ? '-ml-14' : 'ml-2'
// }

function JobCard({ job }) {
  const { user } = useUser();

  return (
    <div
      className={`
        mx-auto relative flex flex-col justify-start w-full px-5 py-3.5 bg-white rounded-lg sm:rounded-xl  shadow-gray-300
      `}
    >
      <div className="flex flex-col items-start justify-start w-full space-y-3 sm:flex-row sm:space-x-4 lg:justify-between sm:space-y-0 lg:items-start lg:flex-row">
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
  );
}

JobCard.propTypes = {
  job: PropTypes.shape({
    isFeatured: PropTypes.bool,
    isGuaranteed: PropTypes.bool,
    companySlug: PropTypes.string,
    companyLogo: PropTypes.string,
    hasCompanyLogo: PropTypes.bool,
    hasCompanyColor: PropTypes.shape({
      color: PropTypes.string,
      isActive: PropTypes.bool,
    }),
  }),
};

export default JobCard;
