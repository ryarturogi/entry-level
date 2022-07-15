import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { JobApi } from './api/JobService';
import jobReducer from './reducers/jobsReducers';
import savedJobsReducers from './reducers/savedJobsReducers';

const middlewares = [JobApi.middleware];

export const store = configureStore({
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    ...middlewares,
  ],
  reducer: {
    [JobApi.reducerPath]: JobApi.reducer,
    jobsList: jobReducer,
    savedJobs: savedJobsReducers,
  },
});

setupListeners(store.dispatch);
