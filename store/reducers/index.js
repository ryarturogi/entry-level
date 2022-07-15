import { combineReducers } from 'redux';

import jobReducer from './jobsReducers';
import savedJobsReducers from './savedJobsReducers';

export default combineReducers({
  jobsList: jobReducer,
  savedJobs: savedJobsReducers,
});
