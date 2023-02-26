import Button from '@/components/UI/Button';
import Image from 'next/image';
import PropTypes from 'prop-types';

function Hero({ title = 'Guiding the next generation of devs!', action, logo }) {
  return (
    <section className="flex flex-col items-center mb-10 justify-center min-w-screen min-h-[255px] bg-hero-pattern bg-center bg-no-repeat bg-cover max-w-8xl w-full rounded-b-4xl mx-auto bg-primary-1000">
      {logo ? (
        <div className="flex items-center justify-center w-24 h-24 mb-5 overflow-hidden bg-white rounded-full">
          <Image alt="company logo" className="w-20 h-20" height={80} src={logo} width={80} />
        </div>
      ) : null}
      <div className="flex flex-col items-center text-white">
        <h1 className="block text-xl font-medium text-center sm:text-2xl md:text-3xl">{title}</h1>
        {action ? (
          <Button
            color="secondary"
            displayType="inline"
            onClick={() => action.handler()}
            rounded="md"
            size="md"
            styles="mt-8 w-full max-w-[205px] max-h-[44px]"
            title={action.title}
          >
            {action.title || 'Post a Job'}
          </Button>
        ) : null}
      </div>
    </section>
  );
}

Hero.propTypes = {
  title: PropTypes.string,
  action: PropTypes.shape({
    title: PropTypes.string,
    handler: PropTypes.func,
  }),
  logo: PropTypes.string,
};

export default Hero;
