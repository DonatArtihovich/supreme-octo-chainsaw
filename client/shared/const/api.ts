export const API_URL = 'http://localhost:3000' as const;

export type API_PATH = '/' | '/users' | '/auth/me' | '/auth/login' | '/auth/signup';

export type API_REQUEST = `${typeof API_URL}${API_PATH}`;

export type IError = {
  message: string | string[];
  statusCode: number;
};
