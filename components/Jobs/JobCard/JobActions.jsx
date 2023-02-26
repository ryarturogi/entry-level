import Button from '@/components/UI/Button';
import {
  getSavedJobs,
  getSavedJobsCount,
  removeJob,
  saveJob,
} from '@/store/actions/savedJobsAction';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const JobActions = (props) => {
  const userID = props.user?.id || props.user?.uid;
  const dispatch = useDispatch();
  const { savedJobs } = useSelector((state) => state.savedJobs);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (savedJobs?.length > 0) {
      const isSaved = savedJobs.find((job) => job.id === props.id);
      setIsSaved(isSaved);
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
      <div className="absolute bottom-2.5 right-3">
        <Button
          className={`w-10 h-10 flex items-end justify-end  ${
            isSaved
              ? 'text-primary-700 hover:text-error-300'
              : 'text-gray-500 hover:text-primary-700'
          }`}
          onClick={handleSavedJobWithoutLogin}
          title={isSaved ? 'Remove' : 'Save'}
        >
          <div className="w-5 h-5">
            <BookmarkIcon />
          </div>
        </Button>
      </div>
    );
  }

  const handleSaveJob = () => {
    if (!userID) {
      return toast.error('You must be logged in to save jobs');
    }
    try {
      dispatch(saveJob(savedJobs?.length > 0 ? savedJobs : [], props));
      toast.success('Job saved!');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      dispatch(getSavedJobs());
      dispatch(getSavedJobsCount());
      setIsSaved(true);
    }
  };

  const handleRemoveSavedJob = () => {
    try {
      dispatch(removeJob(savedJobs?.length > 0 ? savedJobs : [], props));
      toast.warn('Job removed!');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      dispatch(getSavedJobsCount());
      setIsSaved(false);
    }
  };

  return (
    <div className="absolute bottom-3 right-3.5">
      <Button
        className={`w-10 h-10 flex items-end justify-end  ${
          isSaved ? 'text-primary-700 hover:text-error-300' : 'text-gray-500 hover:text-primary-800'
        }`}
        onClick={() => (isSaved ? handleRemoveSavedJob() : handleSaveJob())}
        title={isSaved ? 'Remove' : 'Save'}
      >
        <div className="w-5 h-5">
          <BookmarkIcon />
        </div>
      </Button>
    </div>
  );
};

JobActions.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default JobActions;
