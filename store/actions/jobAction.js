import Client from '@/utils/initDatabase';
import { GET_JOB, GET_JOBS, JOBS_ERROR, JOBS_LOADING } from '../types';

export const getJobs = (contentType, content) => async (dispatch) => {
  dispatch({
    type: JOBS_LOADING,
  });

  try {
    const Jobs = await Client(process.env.NEXT_PUBLIC_PROVIDER_NAME).getJobs(contentType, content);

    dispatch({
      payload: Jobs,
      type: GET_JOBS,
    });
  } catch (error) {
    dispatch({
      payload: error,
      type: JOBS_ERROR,
    });
  }
};

export const getJob = (jobId) => async (dispatch) => {
  dispatch({
    type: JOBS_LOADING,
  });

  try {
    const Job = await Client(process.env.NEXT_PUBLIC_PROVIDER_NAME).getJob(jobId);

    dispatch({
      payload: Job,
      type: GET_JOB,
    });
  } catch (error) {
    dispatch({
      payload: error,
      type: JOBS_ERROR,
    });
  }
};

export const searchJobs = (keywords) => async (dispatch) => {
  dispatch({
    type: JOBS_LOADING,
  });

  try {
    const Jobs = await Client(process.env.NEXT_PUBLIC_PROVIDER_NAME).searchJobs(keywords);

    dispatch({
      payload: Jobs,
      type: GET_JOBS,
    });
  } catch (error) {
    dispatch({
      payload: error,
      type: JOBS_ERROR,
    });
  }
};
