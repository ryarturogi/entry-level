import Button from '@/components/UI/Button'

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center min-w-screen h-[255px] bg-hero-pattern bg-center bg-no-repeat bg-cover max-w-hero rounded-b-3xl mx-auto w-[96%]">
      <div className="flex flex-col items-center text-white">
        <h1 className="mb-5 text-3xl font-bold">Entry Level Developers</h1>
        <h2 className="block mb-8 text-base font-light text-center">
          Entry Level Developers is a remote work community. <br />
          ELDs is the #1 destination to find and list incredible remote jobs.
        </h2>
        <Button
          href="/jobs/new-job"
          classes="bg-notice-danger-100 py-2.5 px-4 text-white font-bold text-sm rounded-md hover:bg-accent-100 transition-all duration-100 ease-in-out"
        >
          Post a Job for $1.00
        </Button>
      </div>
    </section>
  )
}

export default Hero
