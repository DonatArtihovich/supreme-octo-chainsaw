export const mergeClasses = (...classes: (string | false | null)[]) =>
    classes
        .filter(cls => typeof cls === 'string')
        .join(' ');
