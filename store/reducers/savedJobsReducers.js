/* eslint-disable default-param-last */
import {
  SAVE_JOB,
  REMOVE_SAVED_JOB,
  GET_SAVED_JOBS,
  SAVED_JOBS_COUNT,
  SAVED_JOBS_ERROR,
  SAVED_JOBS_LOADING,
} from '../types';

const initialState = {
  error: null,
  savedJobs: [],
  savedJobsCount: 0,
  loading: true,
};

const savedJobsReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_SAVED_JOBS:
      return {
        ...state,
        savedJobs: action.payload,
        loading: false,
      };
    case SAVED_JOBS_COUNT:
      return {
        ...state,
        savedJobsCount: action.payload,
        loading: false,
      };
    case SAVED_JOBS_ERROR:
      return {
        error: action.payload,
        loading: false,
      };
    case SAVE_JOB:
      return {
        ...state,
        savedJobs: [...state.savedJobs, action.payload],
        loading: false,
      };
    case REMOVE_SAVED_JOB:
      return {
        ...state,
        savedJobs: state.savedJobs.filter((job) => job.id !== action.payload),
        loading: false,
      };
    case SAVED_JOBS_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default savedJobsReducers;
