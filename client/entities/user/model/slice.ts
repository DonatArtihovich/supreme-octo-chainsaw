import { APIStatus } from "@/shared/lib";
import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../api/fetch-user";
import { IError } from "@/shared/const/api";
import { signUp } from "../api/sign-up";

export interface IUser {
    id: number;
    name: string;
    email: string;
    avatarUrl: string;
    password: string;
}

export type RejectValue = {
    code: number;
    error: IError;
}

type UserSliceState = {
    user: IUser | null;
    accessToken: string | null,
    fetchUserStatus: APIStatus;
    signUpStatus: APIStatus;
};

const initialState: UserSliceState = {
    user: null,
    accessToken: null,
    fetchUserStatus: 'idle',
    signUpStatus: 'idle',

};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(fetchUser.pending, (state) => ({ ...state, fetchUserStatus: 'pending' }))
            .addCase(fetchUser.fulfilled, (state, { payload: user }) => ({ ...state, fetchUserStatus: 'fulfilled', user }))
            .addCase(fetchUser.rejected, (state) => ({ ...state, fetchUserStatus: 'rejected' }))
            .addCase(signUp.pending, (state) => ({ ...state, signUpStatus: 'pending' }))
            .addCase(signUp.fulfilled, (state, { payload }) => {
                const access_token = payload.access_token;
                if (access_token) {
                    delete payload.access_token;
                }

                return {
                    ...state,
                    signUpStatus: 'fulfilled',
                    user: payload,
                    accessToken: access_token ?? null,
                }
            })
            .addCase(signUp.rejected, (state, { payload }) => {
                console.log('signUp Error: ', payload);
                return { ...state, signUpStatus: 'rejected' }
            })
});