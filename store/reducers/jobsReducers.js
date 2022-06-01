import { GET_JOB, GET_JOBS, JOB_ERROR, JOBS_ERROR } from '../types';

const initialState = {
  error: null,
  job: {},
  jobs: [],
  loading: true,
};

const jobReducers = (state = initialState, action) => {
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
    case JOB_ERROR:
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default jobReducers;
