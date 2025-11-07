import { RejectValue } from "../model/slice";

export const handleError = <T>(e: unknown, rejectWithValue: (value: RejectValue | string) => T): T => {
    const error = e as Error;
    if (typeof error.message === 'string') {
        return rejectWithValue(error.message);
    }

    return rejectWithValue(e as RejectValue);
}