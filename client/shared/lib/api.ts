import store from "@/app/store";

export type APIStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected';

export const fetchJson = (
    input: string | URL | Request,
    init?: RequestInit | undefined,
    accessToken?: string | null,
) => (fetch(input, {
    ...init,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorisation': accessToken ? `Bearer ${accessToken}` : '',
        ...init?.headers,
    },
    credentials: 'include',
})
)