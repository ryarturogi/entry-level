import Client from '@/utils/initDatabase';

import { GET_JOB, GET_JOBS, JOB_ERROR, JOBS_ERROR } from '../types';

export const getJobs = (type, category, location) => async (dispatch) => {
  let Jobs;
  try {
    switch (true) {
      case type:
        Jobs = await Client(process.env.NEXT_PUBLIC_PROVIDER_NAME).getJobs(type);
        console.log(type, category, location);

        break;
      case category:
        Jobs = await Client(process.env.NEXT_PUBLIC_PROVIDER_NAME).getJobs(category);
        console.log(type, category, location);

        break;
      case location:
        Jobs = await Client(process.env.NEXT_PUBLIC_PROVIDER_NAME).getJobs(location);
        console.log(type, category, location);

        break;
      default:
        Jobs = await Client(process.env.NEXT_PUBLIC_PROVIDER_NAME).getJobs();
        console.log(type, category, location);

        break;
    }

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
    const Job = await Client(process.env.NEXT_PUBLIC_PROVIDER_NAME).getJob(jobId);

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
