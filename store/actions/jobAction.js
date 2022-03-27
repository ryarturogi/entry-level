import { GET_JOBS, JOBS_ERROR } from '../types';
import Provider from '@/utils/initDatabase';

export const getJobs = () => async (dispatch) => {
  try {
    let Jobs = await Provider.getJobs();
    dispatch({
      type: GET_JOBS,
      payload: Jobs,
    });
  } catch (error) {
    dispatch({
      type: JOBS_ERROR,
      payload: error,
    });
  }
};

export const getJob = (jobId) => async (dispatch) => {
  try {
    let Job = await Provider.getJob(jobId);
    dispatch({
      type: GET_JOBS,
      payload: Job,
    });
  } catch (error) {
    dispatch({
      type: JOBS_ERROR,
      payload: error,
    });
  }
};
