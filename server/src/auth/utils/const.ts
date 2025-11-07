export const COOKIE_TOKEN_KEY = 'access_token';

export const EXPIRE_PERIOD_MS = 30 * 60 * 1000;

export enum Errors {
    EMAIL_FOUND = 'User with this email already exist.',
    EMAIL_NOT_FOUND = 'User with this email not exist.',
    ID_NOT_FOUND = 'Cannot find user with id.',
};