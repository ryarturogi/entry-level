import Avatar from '@/components/UI/Avatar';
import Link from 'next/link';
import PropTypes from 'prop-types';

const CompanyLogo = ({ hasCompanyLogo, companySlug, companyLogo }) => (
  <div className="self-center">
    {hasCompanyLogo && (
      <Link href={`/company/${companySlug}`}>
        <Avatar avatar={companyLogo} size="md" />
      </Link>
    )}
  </div>
);

export default CompanyLogo;

CompanyLogo.propTypes = {
  hasCompanyLogo: PropTypes.bool.isRequired,
  companySlug: PropTypes.string.isRequired,
  companyLogo: PropTypes.string.isRequired,
};
