  
  
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { JobApi } from 'store/api/JobService';
import jobReducer from 'store/reducers/jobsReducers';

const middlewares = [JobApi.middleware];

export const store = configureStore({
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), ...middlewares],
  reducer: {
    [JobApi.reducerPath]: JobApi.reducer,
    jobsList: jobReducer,
  },
});

setupListeners(store.dispatch);
