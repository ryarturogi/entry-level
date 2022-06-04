import Client from '@/utils/initDatabase';

import { GET_JOB, GET_JOBS, JOBS_ERROR, JOBS_LOADING } from '../types';

export const getJobs = () => async (dispatch) => {
  dispatch({
    type: JOBS_LOADING,
  });

  try {
    const Jobs = await Client(process.env.NEXT_PUBLIC_PROVIDER_NAME).getJobs();

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
export const getJobsByType = (type) => async (dispatch) => {
  dispatch({
    type: JOBS_LOADING,
  });

  try {
    const Jobs = await Client(process.env.NEXT_PUBLIC_PROVIDER_NAME).getJobsByType(type);

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
export const getJobsByCategory = (category) => async (dispatch) => {
  dispatch({
    type: JOBS_LOADING,
  });

  try {
    const Jobs = await Client(process.env.NEXT_PUBLIC_PROVIDER_NAME).getJobsByCategory(category);

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
export const getJobsByTag = (tag) => async (dispatch) => {
  dispatch({
    type: JOBS_LOADING,
  });

  try {
    const Jobs = await Client(process.env.NEXT_PUBLIC_PROVIDER_NAME).getJobsByTag(tag);

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
export const getJobsByLocation = (location) => async (dispatch) => {
  dispatch({
    type: JOBS_LOADING,
  });

  try {
    const Jobs = await Client(process.env.NEXT_PUBLIC_PROVIDER_NAME).getJobsByLocation(location);

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
