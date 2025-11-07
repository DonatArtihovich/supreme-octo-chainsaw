import { ActionReducerMapBuilder, AsyncThunk, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

import { APIStatus } from './api';
import {
  RejectValue,
  ResetErrorActionPayload,
  ResetStatusActionPayload,
  SliceStateStatusName,
} from './slice-types';

export const processError = (payload?: string | RejectValue) => {
  if (!payload) return '';
  if (typeof payload === 'string') return payload;

  const {
    error: { message },
  } = payload;

  return Array.isArray(message) ? message[0] : message;
};

export const pendingHandler =
  <SliceState>(thunkName: SliceStateStatusName<SliceState>): CaseReducer<SliceState> =>
  (state) => ({ ...state, [`${thunkName}Status`]: 'pending' });

export const rejectedHandler =
  <SliceState, RV = unknown>(
    thunkName: SliceStateStatusName<SliceState>,
  ): CaseReducer<SliceState, PayloadAction<string | RV | undefined>> =>
  (state, action) => ({
    ...state,
    [`${thunkName}Status`]: 'rejected',
    [`${thunkName}Error`]: processError(action.payload as RejectValue),
  });

export const resetSliceStatus = <T>(state: T, { payload }: ResetStatusActionPayload<T>) =>
  payload.reduce((prev, curr) => ({ ...prev, [curr]: 'idle' as APIStatus }), { ...state });

export const resetSliceError = <T>(state: T, { payload }: ResetErrorActionPayload<T>) =>
  payload.reduce((prev, curr) => ({ ...prev, [curr]: '' }), { ...state });

export const addDefaultExtraReducers = <SliceState>(
  builder: ActionReducerMapBuilder<SliceState>,
  thunks: AsyncThunk<any, any, { rejectValue: string | RejectValue }>[],
  statuses: ['pending' | 'rejected'] | ['pending', 'rejected'],
) => {
  thunks.forEach((thunk) => {
    const thunkName = thunk.typePrefix.split('/')[1] as SliceStateStatusName<SliceState>;

    if (statuses.includes('pending')) builder.addCase(thunk.pending, pendingHandler(thunkName));
    if (statuses.includes('rejected')) builder.addCase(thunk.rejected, rejectedHandler(thunkName));
  });
};

export const handleError = <T>(
  e: unknown,
  rejectWithValue: (value: RejectValue | string) => T,
): T => {
  const error = e as Error;
  if (typeof error.message === 'string') {
    return rejectWithValue(error.message);
  }

  return rejectWithValue(e as RejectValue);
};
