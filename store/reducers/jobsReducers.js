import { GET_JOBS, JOBS_ERROR } from '../types';

const initialState = {
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
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default jobReducers;
