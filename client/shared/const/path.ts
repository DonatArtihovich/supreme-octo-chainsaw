export type Path = '/' | '/about';

export const paths: [Path, string][] = [
  ['/', 'Home'],
  ['/about', 'About'],
];

export const headerPaths = structuredClone(paths);

export const pathsWithoutHeader: Path[] = [];
export const pathsWithoutFooter: Path[] = [];
