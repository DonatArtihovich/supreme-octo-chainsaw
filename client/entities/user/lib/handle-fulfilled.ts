import { PayloadAction } from "@reduxjs/toolkit";
import { IUser, UserSliceState } from "../const";
import { SliceStateStatusName } from "@/shared/lib";

export const processAccessToken = (payload: { access_token?: string }) => {
    const access_token = payload.access_token;
    if (access_token) {
        delete payload.access_token;
    }

    return access_token ?? null;
}

export const processFulfilledUser = (state: UserSliceState,
    { payload }: PayloadAction<IUser>, thunkName: SliceStateStatusName<UserSliceState>) => ({
        ...state,
        [`${thunkName}Status`]: 'fulfilled',
        user: {
            id: payload.id,
            name: payload.name,
            email: payload.email,
            avatarUrl: payload.avatarUrl,
        }
    })