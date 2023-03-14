import Avatar from '@/components/UI/Avatar';
import PropTypes from 'prop-types';

const UPLOAD_IMAGE_PATH = process.env.NEXT_PUBLIC_SUPABASE_UPLOAD_IMAGE_PATH;

const randomColor = () => {
  const colors = [
    'bg-primary-700',
    'bg-secondary-800',
    'bg-green-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-yellow-500',
    'bg-orange-500',
    'bg-red-500',
    'bg-teal-500',
    'bg-cyan-500',
    'bg-gray-500',
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};

const CompanyLogo = ({ hasCompanyLogo, companySlug, companyLogo, size }) => {
  if (hasCompanyLogo) {
    const COMPANY_LOGO_PATH = companyLogo.includes('company-logos')
      ? `${UPLOAD_IMAGE_PATH}${companyLogo}`
      : companyLogo;

    return (
      <div className="flex items-center justify-center p-1.5 rounded-md bg-gray-50 w-fit h-fit">
        <Avatar avatar={COMPANY_LOGO_PATH} size={size || 'md'} url={`/company/${companySlug}`} />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center w-24 h-24 rounded-lg ${randomColor()}`}>
      <div className="flex items-center justify-center w-full h-full text-2xl font-semibold text-white uppercase">
        {companySlug[0]}
        {companySlug[1]}
      </div>
    </div>
  );
};

CompanyLogo.propTypes = {
  hasCompanyLogo: PropTypes.bool.isRequired,
  companySlug: PropTypes.string.isRequired,
  companyLogo: PropTypes.string.isRequired,
  size: PropTypes.string,
};

export default CompanyLogo;
