import Link from 'next/link'
import Avatar from '@/components/UI/Avatar'
import Button from '@/components/UI/Button'
import JobTags from '@/components/Jobs/JobTags'

import { ArrowRightIcon } from '@heroicons/react/solid'
import { BookmarkIcon } from '@heroicons/react/outline'

const JobCard = ({ job }) => {
  return (
    <li
      style={{
        backgroundColor: job.brandColor ? job.brandColor : '#fff',
        color: job.brandColor ? '#fff' : '#000',
        border: job.brandColor ? 'none' : '',
      }}
      className={`relative flex flex-col justify-center w-full px-5 py-3.5 bg-white rounded-2xl sm:rounded-3xl shadow-md shadow-slate-300 ${
        job.status === 'guaranteed'
          ? 'border-b-[2rem] sm:border-b-0 sm:border-l-[4rem] border-accent-100'
          : job.status === 'featured'
          ? 'border-l-[4.5rem] border-accent-800'
          : ''
      }`}
    >
      <div
        className={`lg:flex items-center space-x-5 ${
          job.status && !job.brandColor ? '-ml-14' : 'ml-2'
        }`}
      >
        <div className="flex flex-col items-center justify-start w-full space-x-5 space-y-3 lg:justify-between sm:space-y-0 sm:items-start lg:items-start sm:flex-row">
          <div className="self-center">
            <Avatar avatar={job.avatar} />
          </div>

          <div className="flex flex-col justify-between w-full lg:items-center lg:flex-row">
            <div className="items-center justify-between w-full lg:flex sm:pr-5">
              <section className="flex flex-col items-center text-center sm:items-start sm:text-left">
                {job.status && (
                  <small className="text-xs font-medium capitalize">{job.status}</small>
                )}

                <Link href={`/jobs/${job.id}`}>
                  <a className="">
                    <div className="text-sm font-light leading-snug hover:text-accent-500">
                      {job.company}
                    </div>
                    <div className="text-base font-bold leading-snug hover:text-accent-500 ">
                      {job.title}
                    </div>
                  </a>
                </Link>

                <small className="text-[0.6rem] font-medium">{job.location}</small>
                <JobTags tags={job.tags} theme={job.brandColor ? 'light' : 'dark'} />
              </section>

              <section className="mt-3 lg:mt-0">
                <h1 className="flex justify-center text-sm font-medium lg:text-sm sm:justify-start">
                  {job.createdAt}
                </h1>
              </section>
            </div>

            <hr
              className={`w-full h-1 lg:w-1 lg:h-[6rem] rounded-xl ${
                job.brandColor ? 'bg-white' : 'bg-gray-100'
              }`}
            />

            <div className="flex w-full items-center sm:max-w-[8rem] space-x-5 justify-center sm:pl-5">
              <Button
                href={`/jobs/${job.id}`}
                className="p-2 text-white rounded-full w-9 h-9 bg-accent-800 hover:bg-green-500"
              >
                <BookmarkIcon />
              </Button>

              <Link href={`/jobs/${job.id}`}>
                <a className="p-2 text-white rounded-full w-9 h-9 bg-notice-danger-100 hover:bg-green-500">
                  <ArrowRightIcon />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default JobCard
