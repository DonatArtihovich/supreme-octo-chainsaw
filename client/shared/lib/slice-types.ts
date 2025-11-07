import { PayloadAction } from '@reduxjs/toolkit';

import { IError } from '../const/api';

type KeysEnding<T, Template extends string = ''> = {
  [K in keyof T]: K extends `${string}${Template}` ? K : never;
}[keyof T];

export type SliceStateError<SliceState> = KeysEnding<SliceState, 'Error'>;
export type SliceStateStatus<SliceState> = KeysEnding<SliceState, 'Status'>;

export type AnyStatusKey<SliceState> = SliceStateStatus<SliceState>;
export type AnyErrorKey<SliceState> = SliceStateError<SliceState>;

export type ResetStatusActionPayload<T> = PayloadAction<AnyStatusKey<T>[]>;
export type ResetErrorActionPayload<T> = PayloadAction<AnyErrorKey<T>[]>;

type StripSuffix<S extends string, Suffix extends string> = S extends `${infer Prefix}${Suffix}`
  ? Prefix
  : never;

export type SliceStateStatusName<SliceState> = StripSuffix<
  SliceStateStatus<SliceState> | SliceStateError<SliceState>,
  'Status' | 'Error'
>;

export type RejectValue = {
  code: number;
  error: IError;
};
