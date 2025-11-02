import { APIStatus } from "@/shared/lib";
import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../api/fetch-user";

export interface IUser {
    id: number;
    name: string;
    email: string;
    avatarUrl: string;
    password: string;
}

type UserSliceState = {
    user: IUser | null;
    fetchUserStatus: APIStatus;
};

const initialState: UserSliceState = {
    user: null,
    fetchUserStatus: 'idle',
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(fetchUser.pending, (state) => ({ ...state, fetchUserStatus: 'pending' }))
            .addCase(fetchUser.fulfilled, (state, action) => ({ ...state, fetchUserStatus: 'fulfilled', user: action.payload }))
            .addCase(fetchUser.rejected, (state, action) => {
                console.log('fetchUser Error: ', action.payload);
                return { ...state, fetchUserStatus: 'rejected' }
            })
});