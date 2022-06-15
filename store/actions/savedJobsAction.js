import Client from '@/utils/initDatabase';

import {
  SAVE_JOB,
  REMOVE_SAVED_JOB,
  GET_SAVED_JOBS,
  SAVED_JOBS_ERROR,
  SAVED_JOBS_LOADING,
  SAVED_JOBS_COUNT,
} from '../types';

export const getSavedJobs = () => async (dispatch) => {
  dispatch({
    type: SAVED_JOBS_LOADING,
  });

  try {
    const SavedJobs = await Client(process.env.NEXT_PUBLIC_PROVIDER_NAME).Auth.getSavedJobs();

    dispatch({
      payload: SavedJobs,
      type: GET_SAVED_JOBS,
    });
    dispatch({
      payload: SavedJobs.length,
      type: SAVED_JOBS_COUNT,
    });
  } catch (error) {
    dispatch({
      payload: error,
      type: SAVED_JOBS_ERROR,
    });
  }
};

export const saveJob = (jobs, job) => async (dispatch) => {
  dispatch({
    type: SAVED_JOBS_LOADING,
  });

  try {
    await Client(process.env.NEXT_PUBLIC_PROVIDER_NAME).Auth.saveJob(jobs, job);

    dispatch({
      payload: job,
      type: SAVE_JOB,
    });
  } catch (error) {
    dispatch({
      payload: error,
      type: SAVED_JOBS_ERROR,
    });
  }
};

export const removeJob = (jobs, job) => async (dispatch) => {
  dispatch({
    type: SAVED_JOBS_LOADING,
  });

  try {
    console.log(jobs, job);
    await Client(process.env.NEXT_PUBLIC_PROVIDER_NAME).Auth.removeJob(jobs, job);

    dispatch({
      payload: job.id,
      type: REMOVE_SAVED_JOB,
    });
  } catch (error) {
    dispatch({
      payload: error,
      type: SAVED_JOBS_ERROR,
    });
  }
};

export const removeAllSavedJobs = () => async (dispatch) => {
  dispatch({
    type: SAVED_JOBS_LOADING,
  });

  try {
    await Client(process.env.NEXT_PUBLIC_PROVIDER_NAME).Auth.removeAllSavedJobs();

    dispatch({
      type: REMOVE_ALL_SAVED_JOBS,
    });
  } catch (error) {
    dispatch({
      payload: error,
      type: SAVED_JOBS_ERROR,
    });
  }
};

export const getSavedJobsCount = () => async (dispatch) => {
  dispatch({
    type: SAVED_JOBS_LOADING,
  });

  try {
    const SavedJobsCount = await Client(
      process.env.NEXT_PUBLIC_PROVIDER_NAME
    ).Auth.getSavedJobsCount();

    dispatch({
      payload: SavedJobsCount,
      type: SAVED_JOBS_COUNT,
    });
  } catch (error) {
    dispatch({
      payload: error,
      type: SAVED_JOBS_ERROR,
    });
  }
};