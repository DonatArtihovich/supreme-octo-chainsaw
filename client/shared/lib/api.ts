export type APIStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected';

export const fetchJson = (path: string) => fetch(path, {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    credentials: 'include',
})