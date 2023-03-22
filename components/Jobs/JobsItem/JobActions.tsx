import React, { useEffect, useState } from 'react';
import Button from '@/components/UI/Button';
import { ERROR_MESSAGES } from '@/constants/index';
import useStore from '@/lib/store';
import ClientApi from '@/utils/initDatabase';
import { BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import { useUser } from '@supabase/auth-helpers-react';
import { toast } from 'react-toastify';
import { JobActionsProps } from './types';
import { REMOVE_BUTTON_TITLE, SAVE_BUTTON_TITLE } from './constants';

const JobActions = (props: JobActionsProps): React.ReactElement => {
  const { id: jobId, outlined } = props;
  const user = useUser();
  const [isSaved, setIsSaved] = useState(false);
  const savedJobs = useStore((state) => state.savedJobs);
  const incrementSavedJobsCount = useStore((state) => state.increment);
  const decrementSavedJobsCount = useStore((state) => state.decrement);

  const updateSavedJobs = async (newSavedJobs: string[] = []): Promise<void> => {
    useStore.setState({ savedJobs: newSavedJobs });
  };

  const handleSaveJob = async (jobId: string): Promise<void> => {
    try {
      // save job
      const { error, success, newSavedJobs } = await ClientApi.saveJob(jobId);

      if (error) {
        toast.error(error?.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG_MESSAGE);
        return;
      }

      if (success) {
        setIsSaved(true);
        incrementSavedJobsCount();
        toast.success(ERROR_MESSAGES.JOB_SAVED_MESSAGE);
        await updateSavedJobs(newSavedJobs);
      }

      toast.error(ERROR_MESSAGES.SOMETHING_WENT_WRONG_MESSAGE);
    } catch (error) {
      toast.error(error?.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG_MESSAGE);
    }
  };

  const handleRemoveSavedJob = async (jobId: string): Promise<void> => {
    try {
      // remove job
      const { success } = await ClientApi.removeSavedJob(jobId);

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

  const checkIfJobIsSaved = (): void => {
    if (!savedJobs) {
      return;
    }
    const isSaved: boolean = savedJobs.find((id: string) => id === jobId);
    setIsSaved(!!isSaved);
  };

  useEffect((): void => {
    checkIfJobIsSaved();
  }, [savedJobs]);

  if (!user) {
    const handleSavedJobWithoutLogin = (): void => {
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

  if (outlined) {
    return (
      <Button
        className={`{
          rounded-md p-1 transition duration-150 ease-in-out active:text-primary-800 active:bg-primary-200
          ${
            isSaved
              ? 'text-gray-700 hover:bg-gray-400 hover:text-gray-700 bg-primary-100'
              : 'text-gray-700 hover:text-gray-700 bg-gray-300 hover:bg-primary-200 '
          }`}
        onClick={() => (isSaved ? handleRemoveSavedJob(jobId) : handleSaveJob(jobId))}
        title={isSaved ? REMOVE_BUTTON_TITLE : SAVE_BUTTON_TITLE}
      >
        <BookmarkIconOutline className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <div className="absolute bottom-3 right-3.5">
      <Button
        className={`w-10 h-10 flex items-end justify-end  ${
          isSaved ? 'text-primary-700 hover:text-error-300' : 'text-gray-500 hover:text-primary-800'
        }`}
        onClick={() => (isSaved ? handleRemoveSavedJob(jobId) : handleSaveJob(jobId))}
        title={isSaved ? REMOVE_BUTTON_TITLE : SAVE_BUTTON_TITLE}
      >
        <div className="w-5 h-5">{!isSaved ? <BookmarkIconOutline /> : <BookmarkIconSolid />}</div>
      </Button>
    </div>
  );
};

export default JobActions;
