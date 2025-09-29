import axiosInstance from '../../../axiosConfig';

export const refreshGoogleAccessToken = async (refresh_token: string): Promise<{ access_token: string; refresh_token?: string }> => {
  try {
    const response = await axiosInstance.post('/google-analytics/refresh-token', { refresh_token });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message || 'Failed to refresh access token';
  }
};
