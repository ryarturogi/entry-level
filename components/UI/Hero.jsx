import Button from '@/components/UI/Button';

function Hero({ title, subtitle, action }) {
  return (
    <section className="flex flex-col items-center mb-5 justify-center min-w-screen min-h-[255px] bg-hero-pattern bg-center bg-no-repeat bg-cover max-w-hero rounded-b-3xl mx-auto w-[96%]">
      <div className="flex flex-col items-center text-white">
        <h1 className="mb-5 text-3xl font-bold">{title || 'Entry Level Developers'}</h1>
        <h2 className="block text-base font-light text-center">
          {subtitle || (
            <>
              Entry Level Developers is a remote work community. <br />
              ELDs is the #1 destination to find and list incredible remote jobs.
            </>
          )}
        </h2>
        {action ? (
          <Button
            rounded="md"
            size="lg"
            styles="mt-8 w-full max-w-[320px]"
            displayType="inline"
            onClick={() => action.handler()}
            title={action.title}
          >
            {action.title || 'Post a Job for $1.00'}
          </Button>
        ) : null}
      </div>
    </section>
  );
}

export default Hero;