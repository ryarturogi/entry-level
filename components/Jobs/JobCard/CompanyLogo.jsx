import Avatar from '@/components/UI/Avatar';
import Link from 'next/link';
import PropTypes from 'prop-types';

const CompanyLogo = ({ hasCompanyLogo, companySlug, companyLogo }) => {
  return (
    <div>
      {hasCompanyLogo && (
        <Link href={`/company/${companySlug}`}>
          <Avatar
            avatar={
              !companyLogo.search('company-logos')
                ? `${process.env.NEXT_PUBLIC_SUPABASE_UPLOAD_IMAGE_PATH}/${companyLogo}`
                : companyLogo
            }
            size="md"
          />
        </Link>
      )}
    </div>
  );
};

CompanyLogo.propTypes = {
  hasCompanyLogo: PropTypes.bool.isRequired,
  companySlug: PropTypes.string.isRequired,
  companyLogo: PropTypes.string.isRequired,
};

export default CompanyLogo;
