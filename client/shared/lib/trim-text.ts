export const trimText = (text: string, maxLength: number) =>
    text.length > maxLength - 3
        ? text.slice(0, maxLength - 3) + '...'
        : text;