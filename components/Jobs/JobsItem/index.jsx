import { useUser } from '@supabase/auth-helpers-react';
import PropTypes from 'prop-types';
import CompanyLogo from '../../UI/CompanyLogo';
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

const JobCardItem = ({ job }) => {
  const user = useUser();
  const isCandidate = user?.user_metadata?.role === 'candidate';

  return (
    <div
      className={`
        mx-auto relative flex flex-col justify-start w-full px-5 py-3.5 bg-white rounded-lg sm:rounded-xl shadow-gray-300
      `}
    >
      {/* grid */}
      <div className="grid grid-cols-12 gap-2 place-items-start">
        <div className="col-span-12 lg:col-span-2">
          <CompanyLogo
            companyLogo={job.companyLogo}
            companySlug={job.companySlug}
            hasCompanyLogo={job.hasCompanyLogo}
          />
        </div>
        <div className="col-span-12 lg:col-span-9">
          <JobContent {...job} />
          {isCandidate && <JobActions {...job} />}
        </div>
      </div>
    </div>
  );
};

JobCardItem.propTypes = {
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

export default JobCardItem;
