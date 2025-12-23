import { configureStore } from '@reduxjs/toolkit';



import authReducer from './slices/authSlice';
import exampleReducer from './slices/exampleSlice';
import faqReducer from './slices/faqSlice';
import connectionReducer from './slices/connection';
import metricsReducer from './slices/metricsSlice';
import catalogReducer from './slices/catalogSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    example: exampleReducer,
    faq: faqReducer,
    connection: connectionReducer,
    metrics: metricsReducer,
    catalog: catalogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
