import Avatar from '@/components/UI/Avatar';
import Link from 'next/link';

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
