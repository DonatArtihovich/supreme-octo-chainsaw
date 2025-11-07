import { ReactNode } from 'react';

import { mergeClasses } from '@/shared/lib';

import cls from './section.module.scss';

type PageSectionProps = {
  header: string;
  children: ReactNode;
  className?: string;
};

export const PageSection = ({ header, children, className }: PageSectionProps) => {
  return (
    <section className={mergeClasses(cls.wrapper, className)}>
      <h2 className={cls.header}>{header}</h2>
      {children}
    </section>
  );
};
