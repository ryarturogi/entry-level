import React from 'react';
import Avatar from '@/components/UI/Avatar';
import { CompanyLogoProps } from './types';
import { randomColor } from './helpers';

const UPLOAD_IMAGE_PATH = String(process.env.NEXT_PUBLIC_SUPABASE_UPLOAD_IMAGE_PATH);

const CompanyLogo: React.FC<CompanyLogoProps> = (props: CompanyLogoProps): React.ReactElement => {
  const { hasCompanyLogo, companySlug, companyLogo, size } = props;

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

export default CompanyLogo;
