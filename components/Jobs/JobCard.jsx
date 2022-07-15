import { useUser } from '@/hooks/useAuthUser';
import {
  getSavedJobs,
  getSavedJobsCount,
  removeJob,
  saveJob,
} from '@/store/actions/savedJobsAction';
import { formatDate, isToday, timeSince } from '@/utils/formatDate';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BookmarkIcon } from '@heroicons/react/outline';
import { ArrowRightIcon } from '@heroicons/react/solid';

import JobTags from '@/components/Jobs/JobTags';
import Avatar from '@/components/UI/Avatar';
import Button from '@/components/UI/Button';
import { toast } from 'react-toastify';

const jobStatus = (job) => {
  switch (true) {
    case job.isGuaranteed:
      return 'border-b-[2rem] sm:border-b-0 sm:border-l-[4rem] border-accent-100';
    case job.isFeatured:
      return 'border-l-[4.5rem] border-accent-800';
    default:
      return '';
  }
};

const JobMeta = ({ job }) => {
  const router = useRouter();

  return (
    <nav className="flex space-x-2 place-items-start mt-0.5 mb-0.5 text-xs ">
      {job.location && (
        <>
          <li
            className="capitalize cursor-pointer hover:text-accent-500"
            onClick={() => router.push(`/jobs/location/${job.location}`)}
          >
            Location: <strong>{job.location}</strong>
          </li>
          <li>
            <strong>|</strong>
          </li>
        </>
      )}
      {job.jobType && (
        <>
          <li
            className="capitalize cursor-pointer hover:text-accent-500"
            onClick={() => router.push(`/jobs/type/${job.jobType}`)}
          >
            Type: <strong>{job?.jobType?.replace('_', ' ')}</strong>
          </li>
          <li>
            <strong>|</strong>
          </li>
        </>
      )}
      {job.jobCategory && (
        <li
          className="capitalize cursor-pointer hover:text-accent-500"
          onClick={() => router.push(`/jobs/category/${job.jobCategory}`)}
        >
          Category: <strong>{job.jobCategory}</strong>
        </li>
      )}
    </nav>
  );
};

const CompanyLogo = ({ job }) => (
  <div className="self-center">
    {job.hasCompanyLogo && (
      <Link href={`/company/${job.companySlug}`}>
        <a>
          <Avatar avatar={job.companyLogo} size="md" />
        </a>
      </Link>
    )}
  </div>
);

const JobContent = ({ job }) => (
  <>
    <div className="items-center justify-between w-full lg:flex sm:pr-5">
      <section className="flex flex-col items-center text-center sm:items-start sm:text-left">
        <div className="space-x-2">
          {job.isFeatured && <small className="text-xs font-medium capitalize">Featured</small>}
          {job.isGuaranteed && job.isFeatured && <span>|</span>}
          {job.isGuaranteed && <small className="text-xs font-medium capitalize">Guaranteed</small>}
        </div>

        <Link href={`/company/${job.companySlug}`}>
          <a>
            <div className="mb-0.5 text-sm font-light hover:text-accent-500">{job.companyName}</div>
          </a>
        </Link>
        <Link href={`/job/${job.id}`}>
          <a>
            <div className="text-lg font-bold hover:text-accent-500 ">{job.jobTitle}</div>
          </a>
        </Link>

        <JobMeta job={job} />
        {job.jobTags && (
          <JobTags tags={job.jobTags} theme={job.hasCompanyColor.isActive ? 'light' : 'dark'} />
        )}
      </section>

      <section className="mt-3 lg:mt-0">
        <h1 className="flex justify-center text-sm font-medium lg:text-sm sm:justify-start">
          {isToday(new Date(job.createdAt), new Date())
            ? timeSince(job.createdAt)
            : formatDate(job.createdAt)}
        </h1>
      </section>
    </div>

    <hr
      className={`w-full h-1 lg:w-1 lg:h-[6rem] rounded-xl ${
        job.hasCompanyColor.isActive ? 'bg-white' : 'bg-gray-100'
      }`}
    />
  </>
);

const JobActions = ({ job, user }) => {
  const userID = user?.id || user?.uid;
  const dispatch = useDispatch();
  const { savedJobs } = useSelector((state) => state.savedJobs);
  const [isSaved, setIsSaved] = useState(
    savedJobs?.length > 0 ? savedJobs?.some((savedJob) => savedJob.id === job.id) : false
  );

  useEffect(() => {
    if (savedJobs) {
      const savedJob = savedJobs.find((j) => j.id === job.id);
      setIsSaved(!!savedJob);
    }
  }, [savedJobs, job.id]);

  if (!userID) {
    const handleSavedJobWithoutLogin = () => {
      toast.info('You must be logged in to bookmark jobs.', {
        toastId: 'savedJobWithoutLogin',
        autoClose: 1000,
      });
    };

    return (
      <div className="flex w-full items-center sm:max-w-[8rem] space-x-5 justify-center sm:pl-5">
        <button
          className={`p-2 text-white rounded-full w-9 h-9 'bg-accent-800 bg-accent-800 hover:bg-green-500`}
          type="button"
          onClick={handleSavedJobWithoutLogin}
        >
          <BookmarkIcon />
        </button>
        <Link href={`/job/${job.id}`}>
          <a className="p-2 text-white rounded-full w-9 h-9 bg-notice-danger-100 hover:bg-green-500">
            <ArrowRightIcon />
          </a>
        </Link>
      </div>
    );
  }

  const handleSaveJob = async () => {
    if (!userID) {
      return toast.error('You must be logged in to save jobs');
    }
    try {
      dispatch(saveJob(savedJobs?.length > 0 ? savedJobs : [], job));
      toast.success('Job saved!');
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(getSavedJobs());
      dispatch(getSavedJobsCount());
      setIsSaved(true);
    }
  };

  const handleRemoveSavedJob = async () => {
    try {
      dispatch(removeJob(savedJobs?.length > 0 ? savedJobs : [], job));
      toast.warn('Job removed!');
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(getSavedJobsCount());
      setIsSaved(false);
    }
  };

  return (
    <div className="flex w-full items-center sm:max-w-[8rem] space-x-5 justify-center sm:pl-5">
      <Button
        className={`p-2 text-white rounded-full w-9 h-9  ${
          isSaved ? 'bg-green-500 hover:bg-red-500' : 'bg-accent-800 hover:bg-accent-500'
        }`}
        title={isSaved ? 'Remove' : 'Save'}
        onClick={() => (isSaved ? handleRemoveSavedJob() : handleSaveJob())}
      >
        <BookmarkIcon />
      </Button>

      <Link href={`/job/${job.id}`}>
        <a className="p-2 text-white rounded-full w-9 h-9 bg-notice-danger-100 hover:bg-green-500">
          <ArrowRightIcon />
        </a>
      </Link>
    </div>
  );
};

function JobCard({ job }) {
  const { user } = useUser();

  return (
    <div
      className={`
        max-w-4xl mx-auto relative flex flex-col justify-center w-full px-5 py-3.5 bg-white rounded-2xl sm:rounded-3xl shadow-md shadow-slate-300
      ${jobStatus(job)}`}
      style={{
        backgroundColor: job.hasCompanyColor.isActive ? job.hasCompanyColor.color : '#fff',
        border: job.hasCompanyColor.isActive ? 'none' : '',
        color: job.hasCompanyColor.isActive ? '#fff' : '#000',
      }}
    >
      <div
        className={`lg:flex items-center space-x-5 ${
          (job.isFeatured || job.isGuaranteed) && !job.hasCompanyColor.isActive ? '-ml-14' : 'ml-2'
        }`}
      >
        <div className="flex flex-col items-center justify-start w-full space-x-5 space-y-3 lg:justify-between sm:space-y-0 sm:items-start lg:items-start sm:flex-row">
          <CompanyLogo job={job} />
          <div className="flex flex-col justify-between w-full lg:items-center lg:flex-row">
            <JobContent job={job} />
            <JobActions job={job} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
