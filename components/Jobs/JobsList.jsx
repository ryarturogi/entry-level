import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJobs } from '@/store/actions/jobAction'
import JobCard from './JobCard'
import Loader from '@/components/UI/Loader'

const JobsList = () => {
  const dispatch = useDispatch()
  const jobsList = useSelector((state) => state.jobsList)
  const { loading, error, jobs } = jobsList

  useEffect(() => {
    dispatch(getJobs())
  }, [dispatch])

  return (
    <section className="flex flex-col items-center justify-center mx-auto w-[96%]">
      <ul className="w-full space-y-5 max-w-hero">
        {loading ? (
          <li className="flex items-center justify-center w-full ">
            <Loader />
          </li>
        ) : error ? (
          error.message
        ) : (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </ul>
    </section>
  )
}

export default JobsList
