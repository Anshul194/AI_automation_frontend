import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../../axiosConfig'

interface AuthState {
  isAuthenticated: boolean;
  user: null | { id: string; name: string; email: string };
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};


export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/users/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const signupUser = async (
  email: string,
  password: string,
  fullName: string,
  role: string,
  is_verify: boolean = true
) => {
  try {
    const response = await axiosInstance.post('/users/signup', {
      email,
      password,
      fullName,
      role,
      is_verify,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};





const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: { id: string; name: string; email: string }; token: string }>) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    setUser(state, action: PayloadAction<{ id: string; name: string; email: string }>) {
      state.user = action.payload;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
  },
});

export const { login, logout, setUser, setToken } = authSlice.actions;
export default authSlice.reducer;
