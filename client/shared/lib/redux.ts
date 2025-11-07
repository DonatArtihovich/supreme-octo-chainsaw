import { createSelector } from '@reduxjs/toolkit';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/app/store';

import { APIStatus } from './api';

export const createStatusObjectSelector = (getStatusSelector: (state: RootState) => APIStatus) =>
  createSelector([getStatusSelector], (state) => ({
    isIdle: state === 'idle',
    isPending: state === 'pending',
    isUncompleted: state === 'idle' || state === 'pending',
    isFulfilled: state === 'fulfilled',
    isRejected: state === 'rejected',
  }));

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
