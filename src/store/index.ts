import { configureStore } from '@reduxjs/toolkit';



import authReducer from './slices/authSlice';
import exampleReducer from './slices/exampleSlice';
import faqReducer from './slices/faqSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    example: exampleReducer,
    faq: faqReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
