import Button from '@/components/UI/Button';
import { ERROR_MESSAGES } from '@/constants/index';
import useStore from '@/lib/store';
import Client from '@/utils/initDatabase';
import { BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import { useUser } from '@supabase/auth-helpers-react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const PROVIDER_NAME = process.env.NEXT_PUBLIC_PROVIDER_NAME;
const ClientApi = Client(PROVIDER_NAME);

const SAVE_BUTTON_TITLE = 'Save';
const REMOVE_BUTTON_TITLE = 'Remove';

const JobActions = (props) => {
  const user = useUser();
  const [isSaved, setIsSaved] = useState(false);
  const savedJobs = useStore((state) => state.savedJobs);
  const incrementSavedJobsCount = useStore((state) => state.increment);
  const decrementSavedJobsCount = useStore((state) => state.decrement);

  const updateSavedJobs = async () => {
    const { data: savedJobs, error } = await ClientApi.getSavedJobs(user.id);

    if (error) {
      return toast.error(error?.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG_MESSAGE);
    }

    useStore.setState({ savedJobs });
  };

  const handleSaveJob = async (jobId) => {
    if (!user) {
      return toast.error(ERROR_MESSAGES.SAVE_JOB_ERROR_MESSAGE);
    }

    try {
      // save job
      const { error, success } = await ClientApi.saveJob(user.id, jobId);

      if (error) {
        return toast.error(error?.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG_MESSAGE);
      }

      if (success) {
        setIsSaved(true);
        incrementSavedJobsCount();
        toast.success(ERROR_MESSAGES.JOB_SAVED_MESSAGE);
        await updateSavedJobs();
      }
    } catch (error) {
      toast.error(error?.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG_MESSAGE);
    }
  };

  const handleRemoveSavedJob = async (jobId) => {
    try {
      // remove job
      const { success } = await ClientApi.removeSavedJob(user.id, jobId);

      if (success) {
        setIsSaved(false);
        decrementSavedJobsCount();
        toast.warn(ERROR_MESSAGES.JOB_REMOVED_MESSAGE);
        await updateSavedJobs();
        return;
      }

      toast.error(ERROR_MESSAGES.SOMETHING_WENT_WRONG_MESSAGE);
    } catch (error) {
      toast.error(error?.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG_MESSAGE);
    }
  };

  const checkIfJobIsSaved = () => {
    const isSaved = savedJobs.find(({ id }) => id === props.id);

    setIsSaved(!!isSaved);
  };

  useEffect(() => {
    checkIfJobIsSaved();
  }, [savedJobs]);

  if (!user) {
    const handleSavedJobWithoutLogin = () => {
      toast.info(ERROR_MESSAGES.SAVE_JOB_ERROR_MESSAGE, {
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
          title={isSaved ? REMOVE_BUTTON_TITLE : SAVE_BUTTON_TITLE}
        >
          <div className="w-5 h-5">
            {!isSaved ? <BookmarkIconOutline /> : <BookmarkIconSolid />}
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="absolute bottom-3 right-3.5">
      <Button
        className={`w-10 h-10 flex items-end justify-end  ${
          isSaved ? 'text-primary-700 hover:text-error-300' : 'text-gray-500 hover:text-primary-800'
        }`}
        onClick={() => (isSaved ? handleRemoveSavedJob(props.id) : handleSaveJob(props.id))}
        title={isSaved ? REMOVE_BUTTON_TITLE : SAVE_BUTTON_TITLE}
      >
        <div className="w-5 h-5">{!isSaved ? <BookmarkIconOutline /> : <BookmarkIconSolid />}</div>
      </Button>
    </div>
  );
};

JobActions.propTypes = {
  id: PropTypes.string.isRequired,
  isSaved: PropTypes.bool,
};

export default JobActions;
