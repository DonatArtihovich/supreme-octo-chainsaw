import { APIStatus } from '@/shared/lib';

export interface IUser {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
}

export type UserSliceState = {
  user: IUser | null;
  accessToken: string | null;
  fetchUserStatus: APIStatus;
  fetchUserError: string;
  signUpStatus: APIStatus;
  signUpError: string;
  signInStatus: APIStatus;
  signInError: string;
};

export const initialState: UserSliceState = {
  user: null,
  accessToken: null,
  fetchUserStatus: 'idle',
  fetchUserError: '',
  signUpStatus: 'idle',
  signUpError: '',
  signInStatus: 'idle',
  signInError: '',
};
