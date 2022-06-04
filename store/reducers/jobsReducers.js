/* eslint-disable default-param-last */
import { GET_JOB, GET_JOBS, JOBS_ERROR, JOBS_LOADING } from '../types';

const initialState = {
  error: null,
  job: {},
  jobs: [],
  loading: true,
};

const jobsReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_JOBS:
      return {
        ...state,
        jobs: action.payload,
        loading: false,
      };
    case JOBS_ERROR:
      return {
        error: action.payload,
        loading: false,
      };
    case GET_JOB:
      return {
        ...state,
        job: action.payload,
        loading: false,
      };
    case JOBS_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default jobsReducers;
