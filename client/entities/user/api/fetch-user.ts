import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../model/slice";
import { type API_PATH, API_URL, IError } from "@/shared/const/api";
import { fetchJson } from "@/shared/lib/api";
import defaultAvatar from "@/assets/images/default-avatar.png"

type RejectValue = {
    code: number;
    error: IError;
}

export const fetchUser = createAsyncThunk<
    IUser,
    undefined,
    { rejectValue: RejectValue | string; }
>('user/fetchUser', async (_, { rejectWithValue }) => {
    try {
        const path = API_URL + ('/me' as API_PATH);

        const response = await fetchJson(path);
        const obj: IUser | IError = await response.json();

        if (response.status !== 200) {
            const rejectObj: RejectValue = {
                code: response.status,
                error: obj as IError,
            }

            throw rejectObj;
        }

        const user = obj as IUser;
        user.avatarUrl = user.avatarUrl ? user.avatarUrl : defaultAvatar.src;

        return user;
    } catch (e) {
        const error = e as Error;
        if (typeof error.message === 'string') {
            return rejectWithValue(error.message);
        }

        return rejectWithValue(e as RejectValue);
    }
})