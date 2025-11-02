import { AppDispatch, RootState } from "@/app/store";
import { APIStatus } from "./api";
import { createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

export const createStatusObjectSelector = (
    getStatusSelector: (state: RootState) => APIStatus
) => createSelector([getStatusSelector], (state) => ({
    isIdle: state === 'idle',
    isPending: state === 'pending',
    isUncompleted: state === 'idle' || state === 'pending',
    isFulfilled: state === 'fulfilled',
    isRejected: state === 'rejected'
}));

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;