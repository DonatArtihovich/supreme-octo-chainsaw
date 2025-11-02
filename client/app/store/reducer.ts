import { userSlice } from "@/entities/user/model/slice";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    [userSlice.name]: userSlice.reducer,
});