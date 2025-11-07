import { addDefaultExtraReducers, resetSliceError, resetSliceStatus } from "@/shared/lib";
import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, signIn, signUp } from "../api";
import { initialState, type UserSliceState } from "../const";
import { processAccessToken, processFulfilledUser } from "../lib/handle-fulfilled";

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        resetStatus: resetSliceStatus<UserSliceState>,
        resetError: resetSliceError<UserSliceState>,
    },
    extraReducers: (builder) => {
        addDefaultExtraReducers(builder, [fetchUser, signIn, signUp], ['pending', 'rejected']);

        return builder
            .addCase(fetchUser.fulfilled, (state, action) => processFulfilledUser(state, action, 'fetchUser'))
            .addCase(signUp.fulfilled, (state, action) => ({
                ...processFulfilledUser(state, action, 'signUp'),
                accessToken: processAccessToken(action.payload),
            }))
            .addCase(signIn.fulfilled, (state, action) => ({
                ...processFulfilledUser(state, action, 'signIn'),
                accessToken: processAccessToken(action.payload),
            }))
    }
});

export const { resetStatus, resetError } = userSlice.actions;