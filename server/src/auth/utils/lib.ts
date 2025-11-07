import { EXPIRE_PERIOD_MS } from "./const";

export const getCookieExpireDate =
    (remember: boolean): Date | undefined =>
        remember
            ? new Date(new Date().getTime() + EXPIRE_PERIOD_MS)
            : undefined;