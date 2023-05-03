import { configureStore } from '@reduxjs/toolkit';
import jobDataReducer from '../features/jobData/jobDataSlice';
import jobFilterReducer from '../features/jobFilter/jobFilterSlice';

export const store = configureStore({
  reducer: {
    jobData: jobDataReducer,
    jobFilter: jobFilterReducer,
  },
});