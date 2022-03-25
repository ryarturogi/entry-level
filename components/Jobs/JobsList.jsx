import JobCard from './JobCard'

const JobsList = ({ jobs }) => {
  return (
    <section className="flex flex-col items-center justify-center mx-auto w-[96%]">
      <ul className="w-full space-y-5 max-w-hero">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </ul>
    </section>
  )
}

export default JobsList
