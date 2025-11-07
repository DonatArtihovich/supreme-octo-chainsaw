import { createAsyncThunk } from '@reduxjs/toolkit';

import defaultAvatar from '@/assets/images/default-avatar.webp';
import { API_REQUEST, API_URL, IError } from '@/shared/const/api';
import { handleError } from '@/shared/lib';
import { RejectValue } from '@/shared/lib';
import { fetchJson } from '@/shared/lib/api';

import { IUser } from '../const';

export const signUp = createAsyncThunk<
  IUser & { access_token?: string },
  Pick<IUser, 'name' | 'email'> & { remember: boolean; password: string },
  { rejectValue: RejectValue | string }
>('user/signUp', async (userData, { rejectWithValue }) => {
  try {
    const path: API_REQUEST = `${API_URL}/auth/signup`;

    const res = await fetchJson(path, {
      method: 'POST',
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        remember: userData.remember,
        cookieAllowed: localStorage.getItem('cookie_allowed') === 'true',
      }),
    });

    const resJson: IUser | IError = await res.json();
    if (res.status !== 200) {
      throw resJson;
    }

    const user = resJson as IUser;
    user.avatarUrl = user.avatarUrl ? user.avatarUrl : defaultAvatar.src;
    return user;
  } catch (e) {
    return handleError(e, rejectWithValue);
  }
});
