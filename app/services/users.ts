import api from './api';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface CreateUserParams {
  name: string;
  email: string;
}

export const getUsers = () => {
  return api.get<any, { data: User[] }>('/users');
};

export const getUser = (id: number) => {
  return api.get<any, { data: User }>(`/users/${id}`);
};

export const createUser = (params: CreateUserParams) => {
  return api.post<any, { data: User }>('/users', params);
};

export const updateUser = (id: number, params: Partial<CreateUserParams>) => {
  return api.put<any, { data: User }>(`/users/${id}`, params);
};

export const deleteUser = (id: number) => {
  return api.delete(`/users/${id}`);
};
