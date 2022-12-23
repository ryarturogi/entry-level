import Button from '@/components/UI/Button';
import {
  getSavedJobs,
  getSavedJobsCount,
  removeJob,
  saveJob,
} from '@/store/actions/savedJobsAction';
import { BookmarkIcon } from '@heroicons/react/outline';
import { ArrowRightIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const JobActions = (props) => {
  const userID = props.user?.id || props.user?.uid;
  const dispatch = useDispatch();
  const { savedJobs } = useSelector((state) => state.savedJobs);
  const [isSaved, setIsSaved] = useState(
    savedJobs?.length > 0 ? savedJobs?.some((savedJob) => savedJob.id === props.id) : false
  );

  useEffect(() => {
    if (savedJobs) {
      setIsSaved(Boolean(savedJobs?.find((j) => j.id === props.id)));
    }
  }, [savedJobs, props.id]);

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
          className={'p-2 text-white rounded-full w-9 h-9 bg-primary-800 hover:bg-primary-500'}
          onClick={handleSavedJobWithoutLogin}
          type="button"
        >
          <BookmarkIcon />
        </button>
        <Link
          className="p-2 text-white rounded-full w-9 h-9 bg-error-100 hover:bg-primary-500"
          href={`/job/${props.id}`}
        >
          <ArrowRightIcon />
        </Link>
      </div>
    );
  }

  const handleSaveJob = async () => {
    if (!userID) {
      return toast.error('You must be logged in to save jobs');
    }
    try {
      dispatch(saveJob(savedJobs?.length > 0 ? savedJobs : [], props));
      toast.success('Job saved!');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      dispatch(getSavedJobs());
      dispatch(getSavedJobsCount());
      setIsSaved(true);
    }
  };

  const handleRemoveSavedJob = async () => {
    try {
      dispatch(removeJob(savedJobs?.length > 0 ? savedJobs : [], props));
      toast.warn('Job removed!');
    } catch (error) {
      // eslint-disable-next-line no-console
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
          isSaved ? 'bg-primary-500 hover:bg-error-300' : 'bg-primary-800 hover:bg-primary-500'
        }`}
        onClick={() => (isSaved ? handleRemoveSavedJob() : handleSaveJob())}
        title={isSaved ? 'Remove' : 'Save'}
      >
        <BookmarkIcon />
      </Button>

      <Link
        className="p-2 text-white rounded-full w-9 h-9 bg-error-100 hover:bg-primary-500"
        href={`/job/${props.id}`}
      >
        <ArrowRightIcon />
      </Link>
    </div>
  );
};

export default JobActions;

JobActions.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.object,
};
