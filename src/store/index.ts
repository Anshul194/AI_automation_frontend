import { configureStore } from '@reduxjs/toolkit';


import authReducer from './slices/authSlice';
import exampleReducer from './slices/exampleSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    example: exampleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
