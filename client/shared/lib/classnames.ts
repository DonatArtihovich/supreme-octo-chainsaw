export const mergeClasses = (...classes: (string | false | null | undefined)[]) =>
    classes
        .filter(cls => typeof cls === 'string')
        .join(' ');
