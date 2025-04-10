import api from './api';

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    role: string;
  };
}

export const login = async (params: LoginParams) => {
  const response = await api.post<any, LoginResponse>('/auth/login', params);
  localStorage.setItem('token', response.token);
  return response;
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};
