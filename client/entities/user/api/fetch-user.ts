import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_REQUEST, API_URL, IError } from "@/shared/const/api";
import { fetchJson } from "@/shared/lib/api";
import defaultAvatar from "@/assets/images/default-avatar.webp"
import { IUser } from "../const";
import { handleError, RejectValue } from "@/shared/lib";

export const fetchUser = createAsyncThunk<
    IUser,
    string | null | undefined,
    { rejectValue: RejectValue | string; }
>('user/fetchUser', async (accessToken, { rejectWithValue }) => {
    try {
        const path: API_REQUEST = `${API_URL}/auth/me`;

        const response = await fetchJson(path, {}, accessToken);
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
        return handleError(e, rejectWithValue);
    }
})