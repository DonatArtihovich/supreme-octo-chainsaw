import { RootState } from '@/app/store';
import { createStatusObjectSelector } from '@/shared/lib';

export const userSelector = (state: RootState) => state.user.user;
export const accessTokenSelector = (state: RootState) => state.user.accessToken;
export const fetchUserStatusSelector = createStatusObjectSelector(
  (state) => state.user.fetchUserStatus,
);

export const signUpStatusSelector = createStatusObjectSelector((state) => state.user.signUpStatus);

export const signUpErrorSelector = (state: RootState) => state.user.signUpError;

export const signInStatusSelector = createStatusObjectSelector((state) => state.user.signInStatus);

export const signInErrorSelector = (state: RootState) => state.user.signInError;
