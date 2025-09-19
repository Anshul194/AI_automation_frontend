import { configureStore } from '@reduxjs/toolkit';



import authReducer from './slices/authSlice';
import exampleReducer from './slices/exampleSlice';
import faqReducer from './slices/faqSlice';
import connectionReducer from './slices/connection';

const store = configureStore({
  reducer: {
    auth: authReducer,
    example: exampleReducer,
    faq: faqReducer,
    connection: connectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
