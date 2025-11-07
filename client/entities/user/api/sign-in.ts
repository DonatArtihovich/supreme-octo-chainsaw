import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_REQUEST, API_URL, IError } from "@/shared/const/api";
import { fetchJson } from "@/shared/lib/api";
import defaultAvatar from '@/assets/images/default-avatar.webp'
import { IUser } from "../const";
import { handleError, RejectValue } from "@/shared/lib";

export const signIn = createAsyncThunk<
    IUser & { access_token?: string; },
    Pick<IUser, 'email'> & { remember: boolean; password: string },
    { rejectValue: RejectValue | string }
>('user/signIn', async (userData, { rejectWithValue }) => {
    try {
        const path: API_REQUEST = `${API_URL}/auth/login`;

        const res = await fetchJson(path, {
            method: 'POST',
            body: JSON.stringify({
                email: userData.email,
                password: userData.password,
                remember: userData.remember,
                cookieAllowed: localStorage.getItem('cookie_allowed') === 'true'
            })
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