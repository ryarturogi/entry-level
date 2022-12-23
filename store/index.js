import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import jobReducer from './reducers/jobsReducers';
import savedJobsReducers from './reducers/savedJobsReducers';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
  reducer: {
    jobsList: jobReducer,
    savedJobs: savedJobsReducers,
  },
});

setupListeners(store.dispatch);
