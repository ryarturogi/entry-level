import Button from '@/components/UI/Button';
import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import CompanyLogo from './CompanyLogo';

const Hero = ({ title = 'Guiding the next generation of devs!', action, logo }) => {
  const user = useUser();
  const router = useRouter();

  return (
    <section className="flex flex-col items-center mb-10 justify-center min-w-screen min-h-[255px] bg-hero-pattern bg-center bg-no-repeat bg-cover max-w-8xl w-full rounded-b-4xl mx-auto bg-primary-1000">
      {logo ? (
        <div className="flex items-center justify-center w-20 h-20 mb-5 overflow-hidden bg-white rounded-full">
          <CompanyLogo companyLogo={logo} companySlug="#" hasCompanyLogo size="sm" />
        </div>
      ) : null}
      <div className="flex flex-col items-center text-white">
        <h1 className="block text-xl font-medium text-center sm:text-xl md:text-2xl">{title}</h1>
        {action && user ? (
          <Button
            color="secondary"
            displayType="inline"
            onClick={() => action.handler()}
            rounded="md"
            size="md"
            styles="mt-8 w-full max-w-[205px] h-[40px]"
            title={action.title}
          >
            {action.title || 'Get Started'}
          </Button>
        ) : (
          <Button
            color="primary"
            displayType="inline"
            onClick={() => router.push('/login')}
            rounded="md"
            size="md"
            styles="mt-8 w-full max-w-[205px] h-[40px]"
            title="Register or Login"
          >
            Join the community
          </Button>
        )}
      </div>
    </section>
  );
};

Hero.propTypes = {
  title: PropTypes.string,
  action: PropTypes.shape({
    title: PropTypes.string,
    handler: PropTypes.func,
  }),
  logo: PropTypes.string,
};

export default Hero;
