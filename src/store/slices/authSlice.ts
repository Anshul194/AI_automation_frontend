import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../../axiosConfig'

interface AuthState {
  isAuthenticated: boolean;
  user: null | { id: string; name: string; email: string };
  token: string | null;
  otpSent: boolean;
  otpVerified: boolean;
  otpError: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  otpSent: false,
  otpVerified: false,
  otpError: null,
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
  is_verify: boolean = true,
  phone?: string
) => {
  try {
    const response = await axiosInstance.post('/users/signup', {
      email,
      password,
      fullName,
      role,
      is_verify,
      ...(phone ? { phone } : {}),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const sendOtp = async (email: string) => {
  try {
    const response = await axiosInstance.post('/otp/send', { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (email: string, otp: string) => {
  try {
    const response = await axiosInstance.post('/otp/verify', { email, otp });
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
    otpSendSuccess(state) {
      state.otpSent = true;
      state.otpError = null;
    },
    otpSendFailure(state, action: PayloadAction<string>) {
      state.otpSent = false;
      state.otpError = action.payload;
    },
    otpVerifySuccess(state) {
      state.otpVerified = true;
      state.otpError = null;
    },
    otpVerifyFailure(state, action: PayloadAction<string>) {
      state.otpVerified = false;
      state.otpError = action.payload;
    },
    resetOtpState(state) {
      state.otpSent = false;
      state.otpVerified = false;
      state.otpError = null;
    },
  },
});

export const { login, logout, setUser, setToken, otpSendSuccess, otpSendFailure, otpVerifySuccess, otpVerifyFailure, resetOtpState } = authSlice.actions;
export default authSlice.reducer;
