import Provider from '@/utils/initDatabase';

import { GET_JOB, GET_JOBS, JOB_ERROR, JOBS_ERROR } from '../types';

export const getJobs = () => async (dispatch) => {
  try {
    const Jobs = await Provider.getJobs();

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
  try {
    const Job = await Provider.getJob(jobId);

    dispatch({
      payload: Job,
      type: GET_JOB,
    });
  } catch (error) {
    dispatch({
      payload: error,
      type: JOB_ERROR,
    });
  }
};
